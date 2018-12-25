import React from 'react'
import { Card, Form, Input, Select, Button, Row, Col, Modal } from 'antd'
import Utils from '../../utils/utils'
import Axios from './../../axios/chadan'

const FormItem = Form.Item
export class Chadan extends React.Component{
    state = {}
    componentDidMount() {
      
    }
    startSubmit = () => {
        const formData = this.props.form.getFieldsValue();

        if(!formData.JSESSIONID){
            Modal.info({
                title:'',
                content: '请填写JSESSIONID'
            })
            return
        }
        this.setState({
            formData
        })
        this.request(formData)
    }
    request = (formData) => {
        Axios.ajax({
            url:'/order/getOrderdd623299',
            data:{
                JSESSIONID: formData.JSESSIONID,
                faceValue: formData.faceValue,
                operator: formData.operator,
                amount: 1,
                channel: 1
            }
        }).then((res) => {
            console.log(res)
            // if(res.errorCode === 200){ //抢单成功

            // }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form
        const SelectArr = [
            [{id:'10',name:'10'},{id:'20',name:'20'},{id:'30',name:'30'},{id:'50',name:'50'},{id:'100',name:'100'}],
            [{id:'MOBILE',name:'移动'},{id:'UNICOM',name:'联通'},{id:'TELECOM',name:'电信'}],
            [{id:'1000',name:'1s/次'},{id:'500',name:'0.5s/次'},{id:'100',name:'0.1s/次'}]
        ]
        return (
            <div>
                <Card>
                    <Row>
                        <Col span={10} offset={7}>
                            <Form layout="vertical">
                                <FormItem label="JSESSIONID" key="JSESSIONID">
                                    {
                                        getFieldDecorator('JSESSIONID',{
                                            initialValue:'cc01debd-f316-4bcb-bb7c-9370af22cd7a'
                                        })(
                                            <Input type="text" />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='面值' key='faceValue'>
                                    {
                                        getFieldDecorator('faceValue', {
                                            initialValue: '10'
                                        })(
                                            <Select
                                                style={{ width: '100' }}
                                            >
                                                {Utils.getOptionList(SelectArr[0])}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='运营商' key='operator'>
                                    {
                                        getFieldDecorator('operator', {
                                            initialValue: 'MOBILE'
                                        })(
                                            <Select
                                                style={{ width: '100' }}
                                            >
                                                {Utils.getOptionList(SelectArr[1])}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='抢单频次' key='timeInterval'>
                                    {
                                        getFieldDecorator('timeInterval', {
                                            initialValue: '1000'
                                        })(
                                            <Select
                                                style={{ width: '100' }}
                                            >
                                                {Utils.getOptionList(SelectArr[2])}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" icon="play-circle" onClick={this.startSubmit}>开始抢单</Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                    
                </Card>
            </div>
        )
    }
}
export default Form.create()(Chadan);