import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Admin from './admin';
import IRouter from './router';


ReactDOM.render(<IRouter />, document.getElementById('root'));
registerServiceWorker();
