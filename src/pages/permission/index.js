import React from 'react'
import { Card, Button, Form,Input, Select, Modal, Transfer, Tree } from 'antd'
import menuConfig from '../../config/menuConfig'
import ETable from './../../components/ETable'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode
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
                    content:'创建成功'
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
    //设置权限
    handlePermission = () => {
        let item = this.state.selectedItem
        console.log(item)
        if(!item){
            Modal.info({
                title: '信息',
                content: '未选中任何项目'
            })
            return
        }
        this.setState({
            isPermissionVisible: true,
            detailInfo: item
        })
        let menuList = item.menuList
        this.setState({
            menuInfo: menuList
        })
    }

    handlePermEditSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue()
        data.role_id = this.state.selectedItem.id
        data.menus = this.state.menuInfo
        axios.ajax({
            url:'/permission/edit',
            data:{
                params:{...data}
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isPermVisible: false
                })
                this.requestList()
            }
        })
    }

    //用户授权
    handleUserAuth = () => {
        let item = this.state.selectedItem
        if(!item){
            Modal.info({
                title: '信息',
                content: '未选中任何项目'
            })
            return
        }
        this.getRoleUserList(item.id)
        this.setState({
            isUserVisible: true,
            isAuthClosed: false,
            detailInfo: this.state.selectedItem
        })
    }
    getRoleUserList = (id) => {
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id:id
                }
            }
        }).then((res)=>{
            if(res){
                this.getAuthUserList(res.data)
            }
        })
    }
    //筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = []
        const targetKeys = []
        if (dataSource && dataSource.length > 0) {
            for (let i=0,len=dataSource.length;i<len;i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if(data.status === 1){
                    targetKeys.push(data.key)
                }
                mockData.push(data)
            }
        }
        this.setState({mockData, targetKeys})
    }

    patchUserInfo = (targetKeys) => {
        this.setState({targetKeys})
    }
    //用户授权提交
    handleUserSubmit = () => {
        let data = {
            user_ids: this.state.targetKeys || [],
            role_id: this.state.selectedItem.id
        }
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res) => {
            if(res){
                this.setState({
                    isUserVisible: false
                })
                this.requestList()
            }
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
        ];
        return (
            <div>
                <Card className="operate-wrap">
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        dateSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
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
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst} />
                </Modal>
                <Modal
                    title="设置权限"
                    okText="确认"
                    cancelText="取消"
                    centered={true}
                    width={600}
                    visible={this.state.isPermissionVisible}
                    onOk={this.handlePermEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermissionVisible: false
                        })
                    }}
                >
                    <PermEditForm
                        wrappedComponentRef={(inst) => this.roleForm = inst}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo||[]}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                    <RoleAuthForm
                        wrappedComponentRef={(inst) => this.userAuthForm = inst}
                        isClosed={this.state.isAuthClosed}
                        detailInfo={this.state.detailInfo}
                        mockData={this.state.mockData}
                        patchUserInfo={this.patchUserInfo}
                    />
                </Modal>
            </div>
        )
    }
}

//角色创建
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
RoleForm = Form.create({})(RoleForm)

//设置权限
class PermEditForm extends React.Component {
    state = {}
    //设置选中的节点，通过父组件方法再传递回来
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    renderTreeNodes = (data,key='') => {
        return data.map((item)=>{
            let parentKey = key + item.key
            if(item.children) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        {this.renderTreeNodes(item.children,parentKey)}
                    </TreeNode>
                )
            } else if(item.btnList) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        {this.renderBtnTreeNode(item,parentKey)}
                    </TreeNode>
                )
            }
            return <TreeNode {...item} />
        })
    }

    renderBtnTreeNode = (menu,parentKey='') => {
        const btnTreeNode = []
        menu.btnList.forEach((item)=>{
            btnTreeNode.push(<TreeNode title={item.title} key={parentKey+'-btn-'+item.key} className="op-role-tree"/>)
            return item
        })
        return btnTreeNode
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        const detail_info = this.props.detailInfo
        const menuInfo = this.props.menuInfo
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled maxLength="8" placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {getFieldDecorator('status',{
                        initialValue: '1'
                    })(
                        <Select
                            style={{width:80}}
                            placeholder="启用"
                        >
                            <Option value="1">启用</Option>
                            <Option value="0">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{this.onCheck(checkedKeys)}}
                    checkedKeys={menuInfo || []}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermEditForm = Form.create({})(PermEditForm)

//用户授权
class RoleAuthForm extends React.Component {

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1
    }

    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys)
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        }
        const detail_info = this.props.detailInfo
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled maxLength={8} placeholder={detail_info.role_name}/>
                </FormItem>
                <FormItem label="选择用户：" {...formItemLayout}>
                    <Transfer
                        listStyle={{width:200,height:400}}
                        dataSource={this.props.mockData}
                        showSearch
                        titles={['待选用户','已选用户']}
                        searchPlaceholder='输入用户名'
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm)
