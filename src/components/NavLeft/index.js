import React from 'react';
import { Menu,Icon } from 'antd';

const SubMenu = Menu.SubMenu;
export default class NavLeft extends React.Component{

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo.png" alt=""/>
                    <h1>建玛特购</h1>
                </div>
                <Menu theme="dark">
                    <SubMenu key="sub1" title={<span><Icon type="mail" />第一个菜单</span>} >
                        <Menu.Item key="1">option 1</Menu.Item>
                        <Menu.Item key="2">option 2</Menu.Item>
                        <Menu.Item key="3">option 3</Menu.Item>
                        <Menu.Item key="4">option 4</Menu.Item>
                    </SubMenu> 
                </Menu>
            </div>
        )
    }
}