import React from 'react'
import { Card,Form } from 'antd' 
import axios from './../../axios/index'
import BaseForm from './../../components/BaseForm'

export default class BikeMap extends React.Component{

    state = {}
    params = {}

    formList = [
        {
            type: '城市'
        },{
            type: '时间查询'
        },{
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '选择订单状态',
            initialValue: '0',
            width: 100,
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'行程结束'}]
        }
    ]

    componentWillMount(){
        // this.requestList()
    }

    requestList = () => {
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }
    //渲染地图数据
    renderMap = (res) => {
        let list = res.data.route_list
        this.map = new window.BMap.map('container')
        let gps1 = list[0].split(',')
        let gps2 = list[list.length-1].split(',')
        let startPoint = new Window.BMap.Point(gps1[0],gps1[1])
        let endPoint = new Window.BMap.Point(gps2[0],gps2[1])
        this.map.centerAndZoom(endPoint,11)
    }
    handelFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    }

    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handelFilterSubmit}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共100辆</div>
                    <div id="container"></div>
                </Card>
            </div>
        )
    }
}