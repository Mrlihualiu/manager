import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../../axios/index';
import Utils from './../../../utils/utils';

export default class High extends React.Component{
    state = {
        dataSource2: [],
    } 
    params = {
        page: 1
    }
    componentDidMount(){
        this.request();
    }
    //动态获取mock数据
    request = () => {
        const _this = this;
        axios.ajax({
            url: '/table/list',
            data:{
                params:{
                    page: this.params.page,
                }
            }
        }).then((res) => {
            if(res.code === 0){
                this.setState({
                    dataSource2: res.data,
                    selectedRowKeys:[],     //重置所选key和item
                    selectedRows:null,
                    pagination: Utils.pagination(res,(current)=>{
                        //to-do
                        _this.params.page = current;
                        this.request();
                    }) 
                })
            }
        })
    }
    render() {
        const columns = [
            {
                title:'id',
                dataIndex:'id',
                key:'id'
            },
            {
                title:'name',
                dataIndex:'name',
                key:'name'
            },
            {
                title:'sex',
                dataIndex:'sex',
                key:'sex',
                render(sex) {
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'age',
                dataIndex:'age',
                key:'age'
            },
            {
                title:'from',
                dataIndex:'from',
                key:'from'
            }
        ];
        return (
            <div>
                <Card title="标头固定">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
            </div>
        );
    }
}