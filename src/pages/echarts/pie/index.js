import React from 'react'
import { Card } from 'antd'
// import echartTheme from './../echartTheme'
import themeLight from './../themeLight'
import echarts from 'echarts/lib/echarts'//按需加载
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends React.Component{

    componentWillMount(){
        echarts.registerTheme('manager',themeLight)
    }

    getOption = ()=>{
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center',
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b} : {c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {
                            name:'周一',
                            value:1700
                        },
                        {
                            name:'周二',
                            value:1100
                        },
                        {
                            name:'周三',
                            value:1500
                        },
                        {
                            name:'周四',
                            value:1500
                        },
                        {
                            name:'周五',
                            value:3000
                        },
                        {
                            name:'周六',
                            value:2000
                        },
                        {
                            name:'周日',
                            value:1200
                        }
                    ]
                }
            ]
        }
        return option
    }

    getOption2 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b} : {c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    radius:['40%','70%'],
                    data:[
                        {
                            name:'周一',
                            value:1700
                        },
                        {
                            name:'周二',
                            value:1100
                        },
                        {
                            name:'周三',
                            value:1500
                        },
                        {
                            name:'周四',
                            value:1500
                        },
                        {
                            name:'周五',
                            value:3000
                        },
                        {
                            name:'周六',
                            value:2000
                        },
                        {
                            name:'周日',
                            value:1200
                        }
                    ]
                }
            ]
        }
        return option
    }
    getOption3 = ()=>{
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b} : {c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    data:[
                        {name:'周一',value:1700},
                        {name:'周二',value:1100},
                        {name:'周三',value:1500},
                        {name:'周四',value:1500},
                        {name:'周五',value:3000},
                        {name:'周六',value:2000},
                        {name:'周日',value:1200}
                    ].sort((a,b)=>{
                        return a.value - b.value
                    }),
                    roseType:'radius'
                }
            ]
        }
        return option
    }

    render(){
        return (
            <div>
                <Card title="饼图一">
                    <ReactEcharts option={this.getOption()} theme="manager" style={{height:500}} />
                </Card>
                <Card title="饼图二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="manager" style={{height:500}} />
                </Card>
                <Card title="饼图三" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="manager" style={{height:500}} />
                </Card>
            </div> 
        )

    }
}