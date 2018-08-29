import React from 'react';
import { Cart,Form,Button,Input,Checkbox,Radio,Select,Switch,TimePicker,Upload,Icon,message, Card } from 'antd';

const FormItem = Form.Item;

export class FormReg extends React.Component{

   

    render() {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            lableCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }

        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
} 
export default Form.create()(FormReg); 