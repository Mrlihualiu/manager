import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'; 
// import { switchMenu } from './../../redux/action';
import MenuConfig from './../../config/menuConfig';
import './index.less';

const SubMenu = Menu.SubMenu;
export default class NavLeft extends React.Component{
    state = {
        openKeys: [],
        currentKey:''
    };
    handleClick = ({item,key}) => {
        // const {dispatch} = this.props
        // dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey: key
        })
    }
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.split('#')[1];
        this.setState({
            currentKey,
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
            return  <Menu.Item title={item.title} key={item.key}>
                        <NavLink to={item.key}>{ item.title }</NavLink>
                    </Menu.Item>
        })
    }
    rootSubmenuKeys = [];
    

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
                    onClick={this.handleClick}
                    selectedKeys={this.state.currentKey}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}  
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}
