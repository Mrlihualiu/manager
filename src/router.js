import React from 'react';
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';

import App from './App';
import Admin from './admin';
import Home from './pages/home';
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
import Line from './pages/echarts/line';
import Rich from './pages/rich';
import Permission from './pages/permission';
import Chadan from './pages/chadan';

export default class IRouter extends React.Component{

  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/common" render={()=>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
              </Common>
            }/>
            <Route path="/" render={()=>
              <Admin>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/chadan" component={Chadan} />
                  <Route path="/ui/buttons" component={Buttons} />
                  <Route path="/ui/modals" component={Modals} />
                  <Route path="/ui/loading" component={Loading} />
                  <Route path="/ui/tabs" component={Tabs} />
                  <Route path="/ui/notification" component={NotiFication} />
                  <Route path="/ui/carousel" component={Carousel} />
                  <Route path="/ui/gallery" component={Gallery} />
                  <Route path="/ui/messages" component={Messages} />
                  <Route path="/form/login" component={FormLogin} />
                  <Route path="/form/reg" component={FormReg} />
                  <Route path="/table/basic" component={Basic} />
                  <Route path="/table/high" component={High} />
                  <Route path="/city" component={City} />
                  <Route path="/order" component={Order} />
                  <Route path="/user" component={User} />
                  <Route path='/bikeMap' component={BikeMap} />
                  <Route path='/charts/bar' component={Bar} />
                  <Route path='/charts/pie' component={Pie} />
                  <Route path='/charts/line' component={Line} />
                  <Route path='/rich' component={Rich} />
                  <Route path='/permission' component={Permission} />
                  <Route component={NoMatch} />
                  <Redirect to="/home" />
                </Switch>
              </Admin>
            }/>
          </Switch>
        </App>
      </HashRouter> 
    );
  }
} 