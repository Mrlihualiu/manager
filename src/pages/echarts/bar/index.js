import React from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme'
import echarts from 'echarts/lib/echarts'//按需加载
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends React.Component{

    componentWillMount(){
        echarts.registerTheme('manager',echartTheme)
    }

    getOption = ()=>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'订单量',
                    type:'bar',
                    data:[1000,800,900,1100,1800,2100,1700]
                }
            ]
        }
        return option
    }

    getOption2 = ()=>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend:{
                data:['OFO','摩拜','小蓝']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'OFO',
                    type:'bar',
                    data:[1000,800,900,1100,1800,2100,1700]
                },
                {
                    name:'摩拜',
                    type:'bar',
                    data:[800,700,850,1000,1600,2000,1500]
                },
                {
                    name:'小蓝',
                    type:'bar',
                    data:[500,522,711,711,1400,1500,1200]
                }
            ]
        }
        return option
    }

    render(){
        return (
            <div>
                <Card title="柱形图一">
                    <ReactEcharts option={this.getOption()} theme="manager" style={{height:500}} />
                </Card>
                <Card title="柱形图二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="manager" style={{height:500}} />
                </Card>
            </div> 
        )

    }
}