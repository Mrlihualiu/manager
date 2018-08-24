import React from 'react';
import { Icon,Row,Col,Tabs,Radio } from 'antd';
import './index.less';

const TabPane = Tabs.TabPane;

export default class Tab extends React.Component{
    state = {
        mode: 'top',
    }

    handleModeChange = (e) => {
        console.log(e.target);
        mode = e.target.value;
        this.setState({mode});
    }

    render(){
        return (
            <div>
                <Row>
                    <Col span={11} className="ui-item">

                        <div className="item-wrap">
                            <div className="item-title">基本--默认选中第一项</div>
                            <div className="item-body">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane> 
                                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane> 
                                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane> 
                                </Tabs>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">有图标</div>
                            <div className="item-body">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab={<span><Icon type="apple"/>苹果</span>} key="1">Content of Tab Pane 1</TabPane> 
                                    <TabPane tab={<span><Icon type="android"/>安卓</span>} key="2">Content of Tab Pane 2</TabPane> 
                                </Tabs>
                            </div>
                        </div>

                    </Col>
                    <Col span={11} className="ui-item">

                        <div className="item-wrap">
                            <div className="item-title">禁用某一项</div>
                            <div className="item-body">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane> 
                                    <TabPane tab="Tab 2" disabled key="2">Content of Tab Pane 2</TabPane> 
                                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane> 
                                </Tabs>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">切换排列方式</div>
                            <div className="item-body">
                                <Radio.Group onChange={this.handleModeChange} value={this.state.mode} style={{ marginBottom: 8 }}>
                                    <Radio.Button value="top">Horizontal</Radio.Button>
                                    <Radio.Button value="left">Vertical</Radio.Button>
                                </Radio.Group>
                                <Tabs 
                                    defaultActiveKey="1"
                                    tabPosition={this.state.mode}
                                    style={{ height: 220 }}
                                >
                                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane> 
                                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane> 
                                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane> 
                                </Tabs>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );
    }
}