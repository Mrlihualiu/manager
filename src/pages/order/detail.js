import React from 'react';
import { Card,Table,Form,Modal,message,Select } from 'antd';
import axios from '../../axios'
import Utils from '../../utils/utils'
import './detail.less'

export default class Order extends React.Component{
    state = {}
    componentDidMount(){
        let orderId = this.props.match.params.orderId;
        if(orderId){
             this.getDetailInfo(orderId)
        }
    }
    //获取订单详情信息
    getDetailInfo = (orderId) => {
        axios.ajax({
            url:'order/detail',
            data:{
                params:{
                    orderId: orderId
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap();
            }
        })
    }
    //地图初始化
    renderMap = () => {
        this.map = new window.BMap.Map('orderDetailMap');
        this.map.centerAndZoom('重庆', 11); 
        this.addMapControl();
        this.drawBikeRoute();
    }
    //添加地图控件
    addMapControl = ()=>{
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
    }
    //绘制用户行驶路线
    drawBikeRoute = (positionList) => {
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
    }

    render(){
        const info = this.state.orderInfo || {};
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                    <div className="detail-items">
                        <div className="detail-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1?'服务区':'停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{Utils.formatPhone(info.mobile)}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="detail-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}