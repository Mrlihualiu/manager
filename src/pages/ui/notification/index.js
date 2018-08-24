import React from 'react';
import { Row,Col,Button,notification,Icon,Select } from 'antd';
import './index.less';

const openNotification1 = () => {
    notification.open({
        message: '提醒框标题',
        description: '这是提醒框的主题内容 ~~~~~~~ 巴拉巴拉 ~~~~ This is the content of the notification.'
    });
};
const openNotification2= () => {
    notification.open({
        message: '提醒框标题',
        description: '这是提醒框的主题内容 ~~~~~~~ 巴拉巴拉 ~~~~ This is the content of the notification.',
        duration: 0
    });
};
const openNotificationWithIcon= (type) => {
    notification[type]({
        message: '提醒框标题',
        description: '这是提醒框的主题内容 ~~~~~~~ 巴拉巴拉 ~~~~ This is the content of the notification.',
    });
};
const openNotification3= () => {
    notification.open({
        message: '提醒框标题',
        description: '这是提醒框的主题内容 ~~~~~~~ 巴拉巴拉 ~~~~ This is the content of the notification.',
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
};
const { Option } = Select;
const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
const openNotification4= () => {
    notification.open({
        message: '提醒框标题',
        description: '这是提醒框的主题内容 ~~~~~~~ 巴拉巴拉 ~~~~ This is the content of the notification.',
    });
};


export default class Modals extends React.Component{

    render(){
        return (
            <div>
                <Row>
                    <Col span={11} className="ui-item">

                        <div className="item-wrap">
                            <div className="item-title">默认 4.5S 后关闭</div>
                            <div className="item-body">
                                <Button type="primary" onClick={openNotification1}>打开通知提醒框</Button>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">带有图标通知的提醒框</div>
                            <div className="item-body">
                                <Button type="primary" onClick={() => openNotificationWithIcon('success')}>Success</Button>
                                <Button type="primary" onClick={() => openNotificationWithIcon('info')}>Info</Button>
                                <Button type="primary" onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
                                <Button type="primary" onClick={() => openNotificationWithIcon('error')}>Error</Button>
                            </div>
                        </div>
                        
                        <div className="item-wrap">
                            <div className="item-title">位置</div>
                            <div className="item-body">
                                <Select
                                    defaultValue="topRight"
                                    style={{ marginRight: 10 }}
                                    onChange={(val) => {
                                        notification.config({
                                            placement: val
                                        });
                                    }}
                                >
                                    {options.map(val => <Option key={val} value={val}>{val}</Option>)}
                                </Select>
                                <Button type="primary" onClick={openNotification4}>打开通知提醒框</Button>
                            </div>
                        </div>

                    </Col>
                    <Col span={11} className="ui-item">
                    
                        <div className="item-wrap">
                            <div className="item-title">自动关闭的延时</div>
                            <div className="item-body">
                                <Button type="primary" onClick={openNotification2}>打开通知提醒框</Button>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">自定义图标</div>
                            <div className="item-body">
                                <Button type="primary" onClick={openNotification3}>打开通知提醒框</Button>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );
    }
}