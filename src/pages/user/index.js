import React from 'react'
import { Card, Button } from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'
import ETable from './../../components/ETable'
import BaseForm from './../../components/BaseForm'

export default class User extends React.Component{
    state = {
        list:[]
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
            width: 80,
        },
    ]

    componentDidMount(){
        this.requestList();
    }

    handleFilter = (params) =>{
        this.params = params;
        this.requestList();
    }
    requestList = () => {
        axios.requestList(this,'/user/list',this.params);
    }

    render(){
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex === 1?'男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1':'',
                        '2':'',
                        '3':'',
                        '4':'',
                        '5':''
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    let config = {
                        '1':'',
                        '2':'',
                        '3':'',
                        '4':'',
                        '5':'',
                        '6':'',
                        '7':'',
                        '8':''
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter(this.state.params)} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" icon="plus">创建员工</Button>
                    <Button icon="edit">编辑员工</Button>
                    <Button>员工详情</Button>
                    <Button type="danger" icon="delete">删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dateSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        rowSelection='checkbox'
                        pagination={false}
                    />
                </div>
            </div>
        )
    }
}

