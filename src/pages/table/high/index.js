import React from 'react';
import { Card, Table, Badge,Button,Modal,message } from 'antd';
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
    handleChange = (pagination,filters,sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }
    handleDelete = (item) => {
        // let id = item.id;
        Modal.confirm({
            title:'确认',
            content:'您确认要删除此条数据吗？',
            onOk:() => {
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
                width: 80,
                key:'id'
            },
            {
                title:'name',
                dataIndex:'name',
                width: 80,
                key:'name'
            },
            {
                title:'sex',
                dataIndex:'sex',
                width: 80,
                key:'sex',
                render(sex) {
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'age',
                dataIndex:'age',
                width: 80,
                key:'age'
            },
            {
                title:'from',
                dataIndex:'from',
                width: 80,
                key:'from'
            }
        ];
        const columns2 = [
            {
                title:'key',
                dataIndex:'key',
                width: 80,
                key:'key',
                fixed: 'left'
            },
            {
                title:'id',
                dataIndex:'id',
                width: 80,
                key:'id',
                fixed: 'left'
            },
            {
                title:'姓名',
                dataIndex:'name',
                width: 80,
                key:'name'
            },
            {
                title:'性别',
                dataIndex:'sex',
                width: 80,
                key:'sex',
                render(sex) {
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age',
                width: 80,
                key:'age1'
            },
            {
                title:'籍贯',
                dataIndex:'from',
                width: 120,
                key:'from',
                render(from){
                    let str = '';
                    switch(from){
                        case 1:
                            str = '华北';
                            break;
                        case 2:
                            str = '华南';
                            break;
                        case 3:
                            str = '华中';
                            break;
                        case 4:
                            str = '西北';
                            break;
                        case 5:
                            str = '西南';
                            break;
                        case 6:
                            str = '华东';
                            break;
                    }
                    return `${str}地区 CHINA`;
                }
            },
            {
                title: '婚否',
                dataIndex:'marry',
                width: 80,
                key:'marry',
                render(marry){
                    return marry===0?'未婚':'已婚'
                }
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                width: 80,
                key:'hobby',
                render(hobby){
                    let str = '';
                    switch(hobby){
                        case 1:
                            str = '健身';
                            break;
                        case 2:
                            str = '看书';
                            break;
                        case 3:
                            str = '绘画';
                            break;
                        case 4:
                            str = '看展';
                            break;
                        case 5:
                            str = '摄影';
                            break;
                        case 6:
                            str = '旅行';
                            break;
                    }
                    return str;
                }
            },
            {
                title:'工作',
                dataIndex:'work',
                width: 80,
                key:'work',
                render(work){
                    let str = '';
                    switch(work){
                        case 1:
                            str = '产品';
                            break;
                        case 2:
                            str = '设计';
                            break;
                        case 3:
                            str = '程序';
                            break;
                        case 4:
                            str = '运营';
                            break;
                        case 5:
                            str = '销售';
                            break;
                    }
                    return str;
                }
            },
            {
                title:'姓名',
                dataIndex:'name',
                width: 80,
                key:'name2'
            },
            {
                title:'性别',
                dataIndex:'sex',
                width: 80,
                key:'sex2',
                render(sex) {
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age',
                width: 80,
                key:'age2'
            },
            {
                title:'姓名',
                dataIndex:'name',
                width: 80,
                key:'name3'
            },
            {
                title:'性别',
                dataIndex:'sex',
                width: 80,
                key:'sex3',
                render(sex) {
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age',
                width: 80,
                key:'age3'
            }
        ];
        const columns3 = [
            {
                title:'id',
                dataIndex:'id',
                width: 80,
                key:'id'
            },
            {
                title:'姓名',
                dataIndex:'name',
                width: 80,
                key:'name'
            },
            {
                title:'性别',
                dataIndex:'sex',
                width: 80,
                key:'sex',
                render(sex) {
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age',
                width: 80,
                key:'age1',
                sorter:(a,b) => {
                    return a.age -b.age;
                },
                sortOrder:this.state.sortOrder
            },
            {
                title:'籍贯',
                dataIndex:'from',
                width: 120,
                key:'from',
                render(from){
                    let str = '';
                    switch(from){
                        case 1:
                            str = '华北';
                            break;
                        case 2:
                            str = '华南';
                            break;
                        case 3:
                            str = '华中';
                            break;
                        case 4:
                            str = '西北';
                            break;
                        case 5:
                            str = '西南';
                            break;
                        case 6:
                            str = '华东';
                            break;
                    }
                    return `${str}地区 CHINA`;
                }
            },
            {
                title: '婚否',
                dataIndex:'marry',
                width: 80,
                key:'marry',
                render(marry){
                    return marry===0?'未婚':'已婚'
                }
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                width: 80,
                key:'hobby',
                render(hobby){
                    let str = '';
                    switch(hobby){
                        case 1:
                            str = '健身';
                            break;
                        case 2:
                            str = '看书';
                            break;
                        case 3:
                            str = '绘画';
                            break;
                        case 4:
                            str = '看展';
                            break;
                        case 5:
                            str = '摄影';
                            break;
                        case 6:
                            str = '旅行';
                            break;
                    }
                    return str;
                }
            },
            {
                title:'岗位',
                dataIndex:'work',
                width: 80,
                key:'work',
                render(work){
                    let str = '';
                    switch(work){
                        case 1:
                            str = '产品';
                            break;
                        case 2:
                            str = '设计';
                            break;
                        case 3:
                            str = '程序';
                            break;
                        case 4:
                            str = '运营';
                            break;
                        case 5:
                            str = '销售';
                            break;
                    }
                    return str;
                }
            },
        ];
        const columns4 = [
            {
                title:'id',
                dataIndex:'id',
                width: 80,
                key:'id'
            },
            {
                title:'姓名',
                dataIndex:'name',
                width: 80,
                key:'name'
            },
            {
                title:'性别',
                dataIndex:'sex',
                width: 80,
                key:'sex',
                render(sex) {
                    return sex === 1?'男':'女'
                }
            },
            {
                title:'年龄',
                dataIndex:'age',
                width: 80,
                key:'age1'
            },
            {
                title:'籍贯',
                dataIndex:'from',
                width: 120,
                key:'from',
                render(from){
                    let str = '';
                    switch(from){
                        case 1:
                            str = '华北';
                            break;
                        case 2:
                            str = '华南';
                            break;
                        case 3:
                            str = '华中';
                            break;
                        case 4:
                            str = '西北';
                            break;
                        case 5:
                            str = '西南';
                            break;
                        case 6:
                            str = '华东';
                            break;
                    }
                    return `${str}地区 CHINA`;
                }
            },
            {
                title: '婚否',
                dataIndex:'marry',
                width: 80,
                key:'marry',
                render(marry){
                    return marry===0?<Badge status="success" text="未婚"/>:<Badge status="error" text="已婚"/>
                }
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                width: 80,
                key:'hobby',
                render(hobby){
                    let str = '';
                    switch(hobby){
                        case 1:
                            str = '健身';
                            break;
                        case 2:
                            str = '看书';
                            break;
                        case 3:
                            str = '绘画';
                            break;
                        case 4:
                            str = '看展';
                            break;
                        case 5:
                            str = '摄影';
                            break;
                        case 6:
                            str = '旅行';
                            break;
                    }
                    return str;
                }
            },
            {
                title:'岗位',
                dataIndex:'work',
                width: 80,
                key:'work',
                render(work){
                    let str = '';
                    switch(work){
                        case 1:
                            str = '产品';
                            break;
                        case 2:
                            str = '设计';
                            break;
                        case 3:
                            str = '程序';
                            break;
                        case 4:
                            str = '运营';
                            break;
                        case 5:
                            str = '销售';
                            break;
                    }
                    return str;
                }
            },
            {
                title: '操作',
                width: 120,
                render:(text,item) => {
                    return <Button type="danger" icon="delete" size="small" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
                }
            }
        ];
        return (
            <div>
                <Card title="表头固定">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左测固定">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                        scroll={{y:240,x:1240}}
                    />
                </Card>
                <Card title="表单操作">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns3}
                        dataSource={this.state.dataSource2}
                        scroll={{y:240}}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns4}
                        dataSource={this.state.dataSource2}
                        scroll={{y:240}}
                    />
                </Card>
            </div>
        );
    }
}