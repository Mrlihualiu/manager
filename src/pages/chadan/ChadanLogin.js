import React from 'react'
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item
export default class ChadanLogin extends React.Component {
  state = {}
  componentDidMount () {

  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="vertical">
        <FormItem label="手机号" key="phone">
          {getFieldDecorator('phone', {
            rules: [{
              required: true,
              message: '请输入手机号'
            }]
          })(
            <Input type="number" />
          )}
        </FormItem>
        <FormItem label="密码" key="password">
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入密码'
            }]
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem >
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}