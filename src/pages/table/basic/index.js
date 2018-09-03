import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../../axios/index';
import Utils from './../../../utils/utils';

export default class Basic extends React.Component{
    state = {
        dataSource2: [],
    } 
    params = {
        page: 1
    }
    componentDidMount(){
        const dataSource = [
            {
                id:'001',
                name:'周杰伦',
                sex:'man',
                age:'38',
                from:'Taiwan CHINA'
            },
            {
                id:'002',
                name:'陈奕迅',
                sex:'man',
                age:'35',
                from:'HongKong CHINA'
            },
            {
                id:'003',
                name:'Taylor Swift',
                sex:'women',
                age:'29',
                from:'USA'
            },
            {
                id:'004',
                name:'ED Sheeran',
                sex:'man',
                age:'27',
                from:'UK'
            },
        ];
        dataSource.map((item,index)=>{
            item.key = index;
        })
        this.setState({
            dataSource
        });
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
    onRowClick = (record,index) => {
        let selectKey = [index];
        Modal.info({
            title: '信息',
            content: `姓名:${record.name},年龄:${record.age}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    //多选框删除功能
    handleDelete = () => {
        let rows = this.state.selectedRows;
        console.log(this.state);
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'提示',
            content: `确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功')
                this.request()
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
                key:'sex'
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
        const columns2 = [
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
                render(sex){
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
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys,selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }  
        }

        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="动态数据渲染表格" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        pagination={false}
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
                <Card title="单选" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                        pagination={false}
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
                <Card title="多选" style={{margin:'10px 0'}}>
                    <div style={{marginBottom:10}}>
                        <Button type="danger" icon="delete" onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        pagination={false}
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
                <Card title="分页" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}