import React from 'react';
import { HashRouter,Route,Switch } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Login from './pages/login';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loading from './pages/ui/loading';
import NotiFication from './pages/ui/notification';
import Tabs from './pages/ui/tabs';
import NoMatch from './pages/nomatch';

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
                            <Route component={NoMatch} />
                        </Admin>
                    } />
                </App>
            </HashRouter>
        );
    }
} 