import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Admin from './admin';
import Home from './pages/route_demo/route1/home';


ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
