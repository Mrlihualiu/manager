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

        let startPointIcon = new window.BMap.Icon('/assets/stat_point.png',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        let bikeMarkerStart = new window.BMap.Marker(startPoint,{ icon:startPointIcon })
        this.map.addOverlay(bikeMarkerStart)

        let endPointIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        let bikeMarkerEnd = new window.BMap.Marker(endPoint,{ icon:endPointIcon })
        this.map.addOverlay(bikeMarkerEnd)

        //绘制车辆行驶路线
        let routeList = []
        list.forEach((item)=>{
            let p = item.split(',')
            routeList.push(new window.BMap.point(p[0],p[1]))
        })
        let polyLine = new window.BMap.PolyLine(routeList,{
            strokeColor: '#ef4136',
            storkeWeiht: 2,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyLine)

        //服务区  画线
        let servicePointList = []
        let serviceList = res.data.service_list
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat))
        })
        let polyServiceLine = new window.BMap.PolyLine(servicePointList,{
            strokeColor: '#ef4136',
            storkeWeiht: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyServiceLine)
        //添加地图中的自行车图标  画点
        let bikeList = res.data.bike_list
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{ //定义图片
            imageSize: new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        })
        bikeList.forEach((item)=>{
            let p = item.split(',')
            let point = new window.BMap.Point(p[0],p[1])    //定义坐标点 维度、精度
            let bikeMarker = new window.BMap.Marker(point,{icon:bikeIcon})     //定义坐标点
            this.map.addOverlay(bikeMarker)     //地图中添加坐标点
        })
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