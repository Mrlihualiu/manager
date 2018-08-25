import React from 'react';
import { Icon,Row,Col,Tabs,Radio,Button } from 'antd';
import './index.less';

const TabPane = Tabs.TabPane;

const operations = <Button type="primary">Extra Action</Button>;

export default class Tab extends React.Component{
    state = {
        mode: 'top',
        size: 'small',
    }

    handleModeChange = (e) => {
        console.log(e.target);
        const mode = e.target.value;
        this.setState({mode});
    }
    onChange = (e) => {
        this.setState({ size: e.target.value });
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
                                    <TabPane tab={<span><Icon type="apple"/>苹果</span>} key="1">Content of Tab Apple</TabPane> 
                                    <TabPane tab={<span><Icon type="android"/>安卓</span>} key="2">Content of Tab Android</TabPane> 
                                </Tabs>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">附加内容--右边添加操作按钮</div>
                            <div className="item-body">
                                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane> 
                                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane> 
                                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane> 
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
                                    style={{ height: 180 }}
                                >
                                    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane> 
                                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane> 
                                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane> 
                                </Tabs>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">大小</div>
                            <div className="item-body">
                                <Radio.Group value={this.state.size} onChange={this.onChange} style={{ marginBottom: 16 }}>
                                    <Radio.Button value="small">Small</Radio.Button>
                                    <Radio.Button value="default">Default</Radio.Button>
                                    <Radio.Button value="large">Large</Radio.Button>
                                </Radio.Group>
                                <Tabs defaultActiveKey="1" szie={this.state.size}>
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