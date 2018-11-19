import React from 'react';
import { HashRouter,Route } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Login from './pages/login';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loading from './pages/ui/loading';
import NotiFication from './pages/ui/notification';
import Tabs from './pages/ui/tabs';
import Carousel from './pages/ui/carousel';
import Gallery from './pages/ui/gallery';
import Messages from './pages/ui/messages';
import FormLogin from './pages/form/login';
import FormReg from './pages/form/reg';
import Basic from './pages/table/basic';
import High from './pages/table/high';
import City from './pages/city';
import Order from './pages/order';
import NoMatch from './pages/nomatch';
import Common from './common';
import OrderDetail from './pages/order/detail';
import User from './pages/user';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';

export default class IRouter extends React.Component{

    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Route path="/admin/ui/buttons" component={Buttons} />
                            <Route path="/admin/ui/modals" component={Modals} />
                            <Route path="/admin/ui/loading" component={Loading} />
                            <Route path="/admin/ui/tabs" component={Tabs} />
                            <Route path="/admin/ui/notification" component={NotiFication} />
                            <Route path="/admin/ui/carousel" component={Carousel} />
                            <Route path="/admin/ui/gallery" component={Gallery} />
                            <Route path="/admin/ui/messages" component={Messages} />
                            <Route path="/admin/form/login" component={FormLogin} />
                            <Route path="/admin/form/reg" component={FormReg} />
                            <Route path="/admin/table/basic" component={Basic} />
                            <Route path="/admin/table/high" component={High} />
                            <Route path="/admin/city" component={City} />
                            <Route path="/admin/order" component={Order} />
                            <Route path="/admin/user" component={User} />
                            <Route path='/admin/bikeMap' component={BikeMap} />
                            <Route path='/admin/charts/bar' component={Bar} />
                            <Route path='/admin/charts/pie' component={Pie} />
                            <Route component={NoMatch} />
                        </Admin>
                    } />
                    <Route path="/common" render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                        </Common>
                    } 
                    />
                </App>
            </HashRouter> 
        );
    }
} 