import React from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker} from 'antd'
import Utils from '../../utils/utils';
const FormItem = Form.Item;

class FilterForm extends React.Component{

    handleFilterSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = ()=>{
        this.props.form.resetFields();
    }

    initFormList = ()=>{
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length>0){
            formList.forEach((item,i)=>{
                let label = item.label;
                let field = item.field;
                let initialValue = item.initiaValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type === '时间查询'){
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                            getFieldDecorator('begin_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(begin_time)
                    const end_time = <FormItem label="~" colon={false} key={field}>
                        {
                            getFieldDecorator('end_time')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(end_time)
                } else if(item.type === 'INPUT'){
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Input type="text" placeholder={placeholder} />
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT)
                } else if (item.type === 'SELECT'){
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{ width: width }}
                                    placeholder={placeholder}
                                >
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT)
                } else if (item.type === 'CHECKBOX'){
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field],{
                                valuePropName: 'checked',
                                initialValue: initialValue
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CHECKBOX)
                } else if (item.type === 'DATEPICKER'){
                    const Date= <FormItem label={label} key={field}>
                        {
                            getFieldDecorator('datepicker')(
                                <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(Date)
                } else if (item.type === '城市'){
                    const cityList = [{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'上海'},{id:'3',name:'天津'},{id:'4',name:'重庆'},]
                    const City= <FormItem label='城市' key={0}>
                        {
                            getFieldDecorator('city',{
                                initialValue: '0'
                            })(
                                <Select
                                    style={{ width: 80}}
                                    placeholder='请选择城市'
                                >
                                    {Utils.getOptionList(cityList)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(City)
                }
            })
            // let isButton = this.props.option.isButton || false;
            if(this.props.option===undefined){
                const b = <FormItem>
                            <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                            <Button onClick={this.reset}>重置</Button>
                </FormItem>;
                formItemList.push(b)
            }
        }
        return formItemList;
    }
    render(){
        return (
            <Form layout={this.props.option?'horizontal':'inline'}>
                { this.initFormList() }
            </Form>
        );
    }
}
export default Form.create({})(FilterForm);