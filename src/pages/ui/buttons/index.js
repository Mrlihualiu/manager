import React from 'react';
import { Row,Col,Button,Radio,Icon,Dropdown, Menu } from 'antd';
import './index.less';

const ButtonGroup = Button.Group;

export default class Buttons extends React.Component{
    state = {
        size: 'large',
        loading: false,
    };

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    enterLoading = () => {
        this.setState({ loading: true });
    }

    render(){
        const size = this.state.size;
        const menu = (
            <Menu>
                <Menu.Item key="1">1st item</Menu.Item>
                <Menu.Item key="2">2st item</Menu.Item>
                <Menu.Item key="3">3st item</Menu.Item>
            </Menu>    
        );

        return (
            <div>
                <Row>
                    <Col span={11} className="ui-item">

                        <div className="item-wrap">
                            <div className="item-title">按钮类型</div>
                            <div className="item-body">
                                <Button type="primary">primary</Button>
                                <Button>默认</Button>
                                <Button type="dashed">dished</Button>
                                <Button type="danger">danger</Button>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">按钮尺寸</div>
                            <div className="item-body">
                                <Radio.Group value={size} onChange={this.handleSizeChange}>
                                    <Radio.Button value="large">Large</Radio.Button>
                                    <Radio.Button value="defalut">Defalut</Radio.Button>
                                    <Radio.Button value="small">Small</Radio.Button>
                                </Radio.Group>
                                <br />
                                <Button type="primary" size={size}>primary</Button>
                                <Button size={size}>默认</Button>
                                <Button type="dashed" size={size}>dished</Button>
                                <Button type="danger" size={size}>danger</Button>
                                <br />
                                <Button type="primary" shape="circle" icon="download" size={size} />
                                <Button type="primary" icon="download" size={size}>DOWNLOAD</Button>
                                <br />
                                <Button.Group size={size}>
                                    <Button type="primary">
                                        <Icon type="left" />Backward
                                    </Button>
                                    <Button type="primary">
                                        Forward<Icon type="right" />
                                    </Button>
                                </Button.Group>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">加载中状态</div>
                            <div className="item-body">
                                <Button type="primary" loading>Loading</Button>
                                <Button type="primary" shape="circle" loading />
                                <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>Pick Me</Button>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">按钮组合</div>
                            <div className="item-body">
                                <h4>Basic</h4>
                                <ButtonGroup className="marginR20">
                                    <Button className="margin0">Cancel</Button>
                                    <Button className="margin0">Ok</Button>
                                </ButtonGroup>  
                                <ButtonGroup className="marginR20">
                                    <Button className="margin0" disabled>L</Button>
                                    <Button className="margin0" disabled>M</Button>
                                    <Button className="margin0" disabled>R</Button>
                                </ButtonGroup>  
                                <ButtonGroup className="marginR20">
                                    <Button className="margin0">L</Button>
                                    <Button className="margin0">M</Button>
                                    <Button className="margin0">R</Button>
                                </ButtonGroup>  
                                <h4>With Icon</h4>
                                <ButtonGroup className="marginR20">
                                    <Button type="primary" className="margin0">
                                        <Icon type="left" />Go back
                                    </Button>
                                    <Button type="primary" className="margin0">
                                        Go forward<Icon type="right" />
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup className="marginR20">
                                    <Button type="primary" className="margin0" icon="cloud" />
                                    <Button type="primary" className="margin0" icon="cloud-download" />
                                </ButtonGroup>
                            </div>
                        </div>
                        
                    </Col>
                    <Col span={11} className="ui-item">

                        <div className="item-wrap">
                            <div className="item-title">图标按钮</div>
                            <div className="item-body">
                                <Button type="primary" shape="circle" icon="search" />
                                <Button type="primary" icon="search">Search</Button>
                                <Button shape="circle" icon="search" />
                                <Button icon="search">Search</Button>
                                <br />
                                <Button type="dashed" shape="circle" icon="search" />
                                <Button type="dashed" icon="search">Search</Button>
                            </div>
                        </div>
                        
                        <div className="item-wrap">
                            <div className="item-title">不可用状态</div>
                            <div className="item-body">
                                <Button type="primary">Primary</Button>
                                <Button type="primary" disabled>Primary(disabled)</Button>
                                <br />
                                <div className="bg-gary">
                                    <Button ghost>Ghost</Button>
                                    <Button ghost disabled>Ghost(disabled)</Button>
                                </div>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">多个按钮组合</div>
                            <div className="item-body">
                                <Button type="primary">Primary</Button>
                                <Dropdown overlay={menu}>
                                    <Button>
                                        Actions <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="item-wrap">
                            <div className="item-title">block按钮</div>
                            <div className="item-body">
                                <Button type="primary" block>primary</Button>
                                <Button block>默认</Button>
                                <Button type="dashed" block>dished</Button>
                                <Button type="danger" block>danger</Button>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );
    }
}