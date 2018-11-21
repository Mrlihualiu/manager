import React from 'react'
import { Card,Button } from 'antd'
import ETable from './../../components/ETable'
import axios from './../../axios/index'
import Utils from './../../utils/utils'

export default class Permission extends React.Component{

    state = {
        list:[],
        isVisible:false
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
                    return status === 0?'停用':'使用中'
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
        return (
            <div>
                <Card className="operate-wrap">
                    <Button type="primary">创建角色</Button>
                    <Button type="primary">设置权限</Button>
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
            </div>
        )
    }
}