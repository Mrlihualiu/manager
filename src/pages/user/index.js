import React from 'react'
import { Card, Button, Modal, Form, Select, Input, Radio, DatePicker } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import ETable from './../../components/ETable'
import BaseForm from './../../components/BaseForm'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option
export default class User extends React.Component{
    state = {
        list:[],
        isVisible:false
    } 
    params = {
        page:1
    }
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名称',
            initiaValue: '',
            width: 80,
        },
        {
            type: 'INPUT',
            label: '手机号',
            field: 'user_mobile',
            placeholder: '请输入手机号',
            width: 80,
        },
        {
            type: 'DATEPICKER',
            label: '入职时间',
            field: 'datepicker',
            placeholder: '入职时间',
            width: '100%',
        }
    ]
    formList2 = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名称',
            initiaValue: '',
            width: '100%',
        },
        {
            type: 'SELECT',
            label: '性别',
            field: 'SEX',
            placeholder: '选择性别',
            width: '100%',
            list:[{id:'0',name:'女'},{id:'1',name:'男'}]
        },
        {
            type: 'SELECT',
            label: '状态',
            field: 'state',
            placeholder: '请选择爱好',
            width: '100%',
            list:[{id:'1',name:'跑步'},{id:'2',name:'游泳'},{id:'3',name:'阅读'},{id:'4',name:'编程'},{id:'5',name:'绘画'},{id:'6',name:'乌克丽丽'},{id:'7',naem:'唱歌'},{id:'8',name:'舞蹈'}]
        },
        {
            type: 'DATAPICKER',
            label: '出生日期',
            field: 'birthday',
            placeholder: '请选择出生日期',
            width: '100%',
        },
        {
            type: 'INPUT',
            label: '联系地址',
            field: 'address',
            placeholder: '请输入联系地址',
            initiaValue: '',
            width: '100%',
        }
    ]
    componentDidMount(){
        this.requestList();
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }
    //请求数据接口
    requestList = () => {
        axios.requestList(this,'/user/list',this.params.page);
    }
    // 新建员工
    handleOperator = (type) => {
        let item = this.state.selectedItem
        if(type === 'create'){
            this.setState({
                isVisible:true,
                title:'创建员工',
                type
            })
        }else if(type === 'edit'||type === 'detail'){
            if(!item){
                Modal.info({
                    title:'信息',
                    content:'请选择一个用户'
                })
                return
            }
            this.setState({
                title:type==='edit'?'编辑用户':'查看详情',
                isVisible:true,
                userInfo:item,
                type
            })
        }else if(type === 'delete'){
            if(!item){
                Modal.info({
                    title:'信息',
                    content:'请选择一个用户'
                })
                return
            }
            Utils.ui.confirm({
                text:'确定要删除此用户吗？',
                onOk:()=>{
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code ==0){
                            this.setState({
                                isVisible:false
                            })
                            this.requestList();
                        }
                    })
                }
            })
        }
    }
    handleSubmit = () => {

    }

    render(){
        const columns = [
            {
                title: 'id',

                dataIndex: 'id'
            },{
                title: '用户名',
                dataIndex: 'username'
            },{
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex === 1?'男':'女'
                }
            },{
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1':'woking',
                        '2':'loving',
                        '3':'alone',
                        '4':'student',
                        '5':'faker'
                    }
                    return config[state];
                }
            },{
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    let config = {
                        '1':'跑步',
                        '2':'游泳',
                        '3':'阅读',
                        '4':'编程',
                        '5':'绘画',
                        '6':'乌克丽丽',
                        '7':'唱歌',
                        '8':'舞蹈'
                    }
                    return config[interest];
                }
            },{
                title: '生日',
                dataIndex: 'birthday'
            },{
                title: '联系地址',
                dataIndex: 'address'
            },{
                title: '早起时间',
                dataIndex: 'time'
            }
        ];
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperator('create')}>创建员工</Button>
                    <Button icon="edit" onClick={()=>this.handleOperator('edit')}>编辑员工</Button>
                    <Button icon="solution" onClick={()=>this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={()=>this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        dateSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={this.state.pagination}
                        rowSelection='checkbox'
                    />
                </div>
                <Modal 
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                >
                    <UserForm type={this.state.type} wrappedCompentRef={(inst)=>this.userForm = inst} />
                </Modal>
            </div>
        )
    }
}

class UserForm extends React.Component{
    render(){
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const { getFieldDecorator }  =this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        getFieldDecorator('username')(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator('sex')(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={0}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state')(
                            <Select>
                                <Option value={1}>读书</Option>
                                <Option value={2}>未成年</Option>
                                <Option value={3}>工作</Option>
                                <Option value={4}>创业</Option>
                                <Option value={5}>自营业主</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        getFieldDecorator('birthday')(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        getFieldDecorator('address')(
                            <TextArea />
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);
