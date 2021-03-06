import React from 'react';
import { Form,Button,Input,Checkbox,Radio,Select,Switch,Upload,Icon, Card, InputNumber,DatePicker } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// const RadioButton = Radio.Button;
const Option = Select.Option;
// const TextArea = Input.TextArea;

export class FormReg extends React.Component{
    state = {
        userImg: '',
        loding: false
    }
    handleSubmit = () =>{
        let userInfo = this.props.form.getFieldsValue();
        console.log(userInfo);
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{
                xs:{ span: 24 },
                sm:{ span: 4 }
            },
            wrapperCol:{
                xs:{ span: 24 },
                sm:{ span: 10 }
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:{ span: 24 },
                sm:{ span: 10,offset:4 }
            } 
        }

        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                        <FormItem {...formItemLayout} label="用户名">
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
                        <FormItem {...formItemLayout} label="密码">
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
                        <FormItem {...formItemLayout} label="性别">
                            {
                                getFieldDecorator('sex',{
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择性别'
                                        }
                                    ]
                                })(
                                    <RadioGroup>
                                        <Radio value="man">男</Radio>
                                        <Radio value="women">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="年龄">
                            {
                                getFieldDecorator('age',{
                                    initialValue: '18',
                                })(
                                    <InputNumber min={1} max={150}/>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="当前状态">
                            {
                                getFieldDecorator('status',{
                                    initialValue: '',
                                })(
                                    <Select placeholder="您当前的状态">
                                        <Option value="1">读书成长中</Option>
                                        <Option value="2">工作ing</Option>
                                        <Option value="3">思考人生</Option>
                                        <Option value="4">移民美利坚</Option>
                                        <Option value="5">留学深造</Option>
                                        <Option value="6">每日收租过</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="爱好">
                            {
                                getFieldDecorator('hobby',{
                                    rules:[
                                        {
                                            required: true,
                                            message: '请选择你的爱好',
                                            type: 'array'
                                        }
                                    ],
                                })(
                                    <Select mode="multiple" placeholder="您的爱好(可多选)">
                                        <Option value="1">跑步</Option>
                                        <Option value="2">游泳</Option>
                                        <Option value="3">摄影</Option>
                                        <Option value="4">游戏</Option>
                                        <Option value="5">骑行</Option>
                                        <Option value="6">打球</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="是否已婚">
                            {
                                getFieldDecorator('isMarry',{
                                    valuePropName: 'checked',
                                    rules:[
                                        {
                                            required: true,
                                            message: '是否婚否不能为空',
                                        }
                                    ],
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="出生日期">
                            {
                                getFieldDecorator('birthday',{
      
                                })(
                                    <DatePicker
                                        placeholder="选择日期"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="头像">
                            {
                                getFieldDecorator('userImg',{
      
                                })(
                                    <Upload 
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                    {this.state.userImg?<img src={this.state.userImg} alt="图片" />:<Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('agree',{
      
                                })(
                                    <Checkbox>我已阅读<a href="javascript">建玛特购协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
} 
export default Form.create()(FormReg); 