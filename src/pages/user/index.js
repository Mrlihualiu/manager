import React from 'react'
import { Card, Button } from 'antd'
import axios from './../../axios/index'
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
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" icon="plus" style={{marginRight:10}}>创建员工</Button>
                    <Button icon="edit" style={{marginRight:10}}>编辑员工</Button>
                    <Button icon="solution" style={{marginRight:10}}>员工详情</Button>
                    <Button type="danger" icon="delete" style={{marginRight:10}}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        dateSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        pagination={this.state.pagination}
                    />
                </div>
            </div>
        )
    }
}

