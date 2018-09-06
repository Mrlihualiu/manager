import React from 'react';
import { Card,Table,Form,Button,Modal,message,Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends React.Component{
    state = {}
    render(){
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
            </div>
        ); 
    }
}

class FilterForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select style={{width:100}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">北京</Option>
                                <Option value="2">上海</Option>
                                <Option value="3">广州</Option>
                                <Option value="4">深圳</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator('mode')(
                            <Select style={{width:120}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">指定停车模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式">
                    {
                        getFieldDecorator('op_mode')(
                            <Select style={{width:80}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator('auth_status')(
                            <Select style={{width:100}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm);