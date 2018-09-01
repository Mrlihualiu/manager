import React from 'react';
import { Card, Table } from 'antd';
import axios from 'axios';

export default class Basic extends React.Component{
    state = {
        dataSource2: [],
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
        this.setState({
            dataSource
        });
        this.request();
    }

    //动态获取mock数据
    request = () => {
        let baseUrl = 'https://www.easy-mock.com/mock/5b8a081a78b10172ddd399ec/managerapi';
        axios.get(baseUrl+'/table/list').then((res)=>{
            if(res.status === '200'){ 
                res.data.data.map((item, index) => {
                    item.key = index;
                })
                this.setState({
                    dataSource2: res.data.data
                })
                console.log(this.state.dataSource2);
            }
        });
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
            </div>
        );
    }
}