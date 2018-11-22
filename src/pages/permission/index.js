import React from 'react'
import { Card,Button,Form,Input,Select, Modal,Transfer, Switch } from 'antd'
import ETable from './../../components/ETable'
import axios from './../../axios/index'
import Utils from './../../utils/utils'

const FormItem = Form.Item
const Option = Select.Option

export default class Permission extends React.Component{

    state = {
        list:[],
        isVisible:false,
        isPermissionVisible:false
    }
    params = {
        page: 1
    }

    componentDidMount(){
        this.requestList();
    }

    //请求数据接口
    requestList = () => {
        axios.requestList(this,'/permission/list',this.params.page);
    }
    //创建角色提交
    handleRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue()
        axios.ajax({
            url:'role/create',
            data:{
                params: data
            }
        }).then((res)=>{
            if(res.code===0){
                Modal.info({
                    title:'信息',
                    content:''
                })
            }
        })
    }
    //打开创建角色弹窗
    handleRole = () => {
        this.setState({
            isVisible: true
        })
    }
    handlePermission = () => {
        let item = this.state.updateSelectedItem
        console.log(item)
        if(!item){
            Modal.info({
                title:'信息',
                content:'请选择一个用户'
            })
            return
        }
        this.setState({
            isPermissionVisible: true
        })
    }

    render(){
        const columns = [
            {
                title:'角色ID',
                dataIndex:'id'
            },{
                title:'角色名称',
                dataIndex:'role_name'
            },{
                title:'创建时间',
                dataIndex:'create_time'
            },{
                title:'使用状态',
                dataIndex:'status',
                render(status){
                    return status === 0?'关闭':'开启'
                }
            },{
                title:'授权时间',
                dataIndex:'authorize_time',
                render(authorize_time) {
                    return Utils.formateDate(authorize_time)
                }
            },{
                title:'授权人',
                dataIndex:'authorize_user_name',
                render(authorize_user_name){
                    let config = {
                        '1':'董事长',
                        '2':'HR专员',
                        '3':'部门经理',
                        '4':'管理员',
                        '5':'主管'
                    }
                    return config[authorize_user_name]
                }
            }
        ]
        const transferData = [
            {key:'1',title:'权限1'},
            {key:'2',title:'权限2'},
            {key:'3',title:'权限3'},
            {key:'4',title:'权限4'},
            {key:'5',title:'权限5'},
            {key:'6',title:'权限6'},
        ]
        return (
            <div>
                <Card className="operate-wrap">
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary">用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        dateSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={this.state.pagination}
                        rowSelection='radio'
                    />
                </div>
                <Modal
                    title="创建角色"
                    okText="创建"
                    cancelText="取消"
                    centered={true}
                    visible={this.state.isVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields()
                        this.setState({
                            isVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst} />
                </Modal>
                <Modal
                    title="设置权限"
                    okText="确认"
                    cancelText="取消"
                    centered={true}
                    visible={this.state.isPermissionVisible}
                    // onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermissionVisible: false
                        })
                    }}
                >
                    <Transfer
                        dataSource={transferData}
                        titles={['可授权权限', '已有权限']}
                        render={item => item.title}
                    />
                </Modal>
            </div>
        )
    }
}

class RoleForm extends React.Component{
    render(){
        const { getFieldDecorator }  =this.props.form;
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status')(
                            <Select>
                                <Option value={0}>关闭</Option>
                                <Option value={1}>开启</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);