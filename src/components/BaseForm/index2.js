import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio } from 'antd'
import Utils from '../../utils'

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.component{

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        if(formList&&formList.length>0){
            formList.forEach((item,i) => {
                let lable = item.lable;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type === 'SELECT'){
                    const SELECT = <FormItem lable={lable} key={field}>
                        {
                            getFieldDecorator([field],{
                                initialValue: initialValue
                            })(
                                <Select
                                    style={{width: width}}
                                    placeholder={placeholder} 
                                > 
                                    { Utils.getOptionList(item.list) }
                                </Select>
                            )
                        }
                    </FormItem>
                }else if(item.type === 'INPUT'){
                    const INPUT = <FormItem lable={lable} key={field}>
                    {
                        getFieldDecorator([field],{
                            initialValue: initialValue
                        })(
                            <Select
                                style={{width: width}}
                                placeholder={placeholder} 
                            > 
                                { Utils.getOptionList(item.list) }
                            </Select>
                        )
                    }
                </FormItem>
                }else if(item.type === 'CHECKBOX'){
                    const CHECKBOX = <FormItem lable={lable} key={field}>
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
                    </FormItem>
                }
            })
        }
    }

    render() {
        return  (
            <Form>

            </Form>    
        )
    }
}