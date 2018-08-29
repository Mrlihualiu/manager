import React from 'react';
import { Row,Col,Button,Checkbox,Form,Input,Icon,message } from 'antd';
import './index.less';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class FormLogin extends React.Component{
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.from.validateFields((err,values) => {
            if(!err){
                console.log('Received values of form: ', values);
            }
        });
    }
    handleSubmit2 = (e) => {
        e.preventDefault();
        let userInfo = this.props.form.getFieldsValue();
        console.log(userInfo);
        this.props.form.validateFields((err,values) => {
            if(!err){
                message.success(`${userInfo.userName2} 恭喜你,密码填写正确。${userInfo.password2}`);
            }
        });
    }

    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        return (
            <div>
                <Row>
                    <Col span={11} className="ui-item">
                        <div className="item-wrap">
                            <div className="item-title">横向登录</div>
                            <div className="item-body">
                                <Form layout="inline" onSubmit={this.handleSubmit}>
                                    <FormItem
                                        validateStatus={userNameError ? 'error' : ''}
                                        help={userNameError || ''}
                                    >
                                        {getFieldDecorator('userName',{
                                            rules: [
                                                { required: true, message: '用户名不能为空！' },
                                                { min:5,max:10, message: '长度不在范围内' },
                                                { pattern: new RegExp('^\\w+$','g'), message: '用户名必须为字母或数字' },
                                            ],
                                        })(
                                            <Input placeholder="请输入用户名"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        validateStatus={passwordError ? 'error' : ''}
                                        help={passwordError || ''}
                                    >
                                        {getFieldDecorator('password',{
                                            rules: [{ required: true, message: '请输入用密码！' }],
                                        })(
                                            <Input type="password" placeholder="请输入密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            disabled={hasErrors(getFieldsError())}
                                            className="no-margin"
                                        >
                                            登录
                                        </Button>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </Col>
                    <Col span={11} className="ui-item">
                        <div className="item-wrap">
                            <div className="item-title">竖向登录</div>
                            <div className="item-body">
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem label="用户名">
                                        {getFieldDecorator('userName2',{
                                            initiaValue: false,
                                            rules: [{ required: true, message: '请输入用户名！' }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名"/>
                                        )}
                                    </FormItem>
                                    <FormItem label="密码">
                                        {getFieldDecorator('password2',{
                                            initiaValue: false,
                                            rules: [{ required: true, message: '请输入用密码！' }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('remember',{
                                            valuePropName: 'checked',
                                            initiaValue: true,
                                        })(
                                            <Checkbox>记住我</Checkbox>
                                        )}
                                        <a className="login-form-forgot" href="">忘记密码</a>
                                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit2}>
                                            登录
                                        </Button>
                                        没有账号？<a href="">马上注册</a>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Form.create()(FormLogin);