import React from 'react';
import { Row, Col, Icon, Button } from 'antd';
import './index.less';
import Utils from '../../utils/utils';
import axios from '../../axios/index';

export default class Header extends React.Component{
    state={}
    componentWillMount(){
        this.setState({
            userName:'蒙奇D路飞'
        })
        this.getWeatherAPIData();
        setInterval(()=>{
            let sysTime = Utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
    }

    getWeatherAPIData(){
        let city = '重庆';
        axios.jsonp({
            url:'https://www.sojson.com/open/api/weather/json.shtml?city='+encodeURIComponent(city)
        }).then((res)=>{
            console.log(res);
        })
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎，<Icon type="user"/>{this.state.userName}</span>
                        <Button type="danger" size="small" style={{marginLeft:10}}>退出</Button>
                    </Col>    
                </Row> 
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">首页</Col>    
                    <Col span="20" className="weather">
                        <span className="date">{ this.state.sysTime }</span>
                        <span className="weather-detail">晴转多云</span>
                    </Col>    
                </Row> 
            </div>
        );
    }
}