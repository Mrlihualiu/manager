import React from 'react';
import { Menu,Icon } from 'antd';
import MenuConfig from './../../config/menuConfig';
import './index.less';

const SubMenu = Menu.SubMenu;
export default class NavLeft extends React.Component{
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }
    // 菜单渲染
    renderMenu=(data) => {
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            this.rootSubmenuKeys.push(item.title);
            return <Menu.Item title={item.title} key={item.key}>{ item.title }</Menu.Item>
        })
    }
    rootSubmenuKeys = [];

    state = {
        openKeys: [],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo.png" alt=""/>
                    <h1>建玛特购</h1>
                </div>
                <Menu 
                    theme="dark" 
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}  
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}