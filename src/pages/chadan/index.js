import React from 'react'
import { Card, Form, Input, Select, Button, Row, Col, Modal, Icon} from 'antd'
import JSEncrypt from 'jsencrypt'
import Utils from '../../utils/utils'
import Axios from './../../axios/chadan'
import qs from 'qs'
const FormItem = Form.Item
export class Chadan extends React.Component {
  state = {
    visible: false,
    JSESSIONID: ''
  }
  componentDidMount() {

  }
  handleChadanLogin = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.requestChadanLogin(values)
      }
    });
  }
  requestChadanLogin = (values) => {
    const userNo = values.phone
    let loginPwd = values.password
    Axios.ajax({
      url: 'http://chadan.wang/user/getPublicKey',
      data: { userNo }
    }).then((res) => {
      if (res.errorCode === 200) {
        let rsa = new JSEncrypt()
        rsa.setPublicKey(res.data.publick_key)
        const resloginPwd = encodeURIComponent(rsa.encrypt(loginPwd +''+res.data.random_str))
        const data = {
          userNo: userNo,
          loginPwd: resloginPwd
        }
        Axios.ajax({
          url: 'http://chadan.wang/user/login',
          data: qs.stringify(data)
        }).then((res) => {
          if (res.errorCode === 200) {
            localStorage.jsonid = res.data.remark
            localStorage.userNo = userNo
            localStorage.loginPwd = loginPwd
            this.setState({
              visible: false
            })
          } else {
            Modal.error({
              title: '错误信息',
              content: res.errorMsg
            });
          }
        })
      } else {
        Modal.error({
          title: '错误信息',
          content: res.errorMsg
        });
      }
      
    })
  }
  startSubmit = () => {
    const JSESSIONID = localStorage.getItem('jsonid')

    if (JSESSIONID === null) {
      this.setState({
        visible: true
      })
    } else {
      this.setState({ JSESSIONID })
      const formData = this.props.form.getFieldsValue()
      this.request(formData)
    }
  }
  request = (formData) => {
    Axios.ajax({
      url: '/order/getOrderdd623299',
      data: {
        JSESSIONID: this.state.JSESSIONID,
        faceValue: formData.faceValue,
        operator: formData.operator,
        amount: 1,
        channel: 1
      }
    }).then((res) => {
      console.log(res)
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const SelectArr = [
      [{
        id: '10',
        name: '10'
      }, {
        id: '20',
        name: '20'
      }, {
        id: '30',
        name: '30'
      }, {
        id: '50',
        name: '50'
      }, {
        id: '100',
        name: '100'
      }], [{
        id: 'MOBILE',
        name: '移动'
      }, {
        id: 'UNICOM',
        name: '联通'
      }, {
        id: 'TELECOM',
        name: '电信'
      }], [{
        id: '1000',
        name: '1s/次'
      }, {
        id: '500',
        name: '0.5s/次'
      }, {
        id: '100',
        name: '0.1s/次'
      }]
    ]
    return ( 
      <div>
        <Card>
          <Row>
            <Col span = { 10 } offset = { 7 }>
              <Form layout = "vertical">
                <FormItem label = '面值' key = 'faceValue'>
                  {
                    getFieldDecorator('faceValue', {
                      initialValue: '10'
                    })(
                      <Select style = {{width: '100'}}>
                        {Utils.getOptionList(SelectArr[0])}
                      </Select>
                    )
                  } 
                </FormItem>
                <FormItem label = '运营商' key = 'operator'>
                  {
                    getFieldDecorator('operator', {
                      initialValue: 'MOBILE'
                    })(
                      <Select style = {{width: '100'}}>
                        {Utils.getOptionList(SelectArr[1])}
                      </Select>
                    )
                  }
                </FormItem> 
                <FormItem label = '抢单频次' key = 'timeInterval'>
                  {
                    getFieldDecorator('timeInterval', {
                      initialValue: '1000'
                    })( 
                      <Select style = {{width: '100'}} >
                        {Utils.getOptionList(SelectArr[2])} 
                      </Select>
                    )
                  }
                </FormItem>
                <FormItem >
                  <Button type = "primary"
                    icon = "play-circle"
                    onClick = {this.startSubmit}
                  >
                    开始抢单
                  </Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </Card>
        <Modal
          visible={this.state.visible}
          closable={false}
          footer={null}
          width={400}
          title="登录"
        >
          <Form layout="vertical" onSubmit={this.handleChadanLogin}>
            <FormItem key="phone">
              {getFieldDecorator('phone', {
                rules: [{
                  required: true,
                  message: '请输入手机号'
                }]
              })(
                <Input
                  type="phone"
                  placeholder="请输入手机号"
                  allowClear={true}
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.35)' }} />}
                />
              )}
            </FormItem>
            <FormItem key="password">
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: '请输入密码'
                }]
              })(
                <Input
                  type="password"
                  placeholder="请输入密码"
                  allowClear={true}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.35)' }} />} />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(Chadan);