import React from 'react'
import { Card } from 'antd'
import themeLight from './../echartTheme'
// import themeLight from './../themeLight'
import echarts from 'echarts/lib/echarts'//按需加载
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Line extends React.Component{

    componentWillMount(){
        echarts.registerTheme('manager',themeLight)
    }

    getOption = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[1000,800,900,1100,1800,2100,1700]
                }
            ]
        }
        return option
    }
    getOption2 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            legend:{
                data:['OFO','摩拜']
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO',
                    type:'line',
                    data:[1000,800,900,1100,1800,2100,1700]
                },
                {
                    name:'摩拜',
                    type:'line',
                    data:[800,700,850,1000,1600,2000,1500]
                }
            ]
        }
        return option
    }
    getOption3 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                type: 'category',
                boundaryGap: false,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'line',
                    data:[1000,800,900,1100,1800,2100,1700],
                    areaStyle:{}
                }
            ]
        }
        return option
    }

    render(){
        return (
            <div>
                <Card title="折线图一">
                    <ReactEcharts option={this.getOption()} theme="manager" style={{height:500}} />
                </Card>
                <Card title="折线图二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="manager" style={{height:500}} />
                </Card>
                <Card title="折线图三" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="manager" style={{height:500}} />
                </Card>
            </div> 
        )

    }
}