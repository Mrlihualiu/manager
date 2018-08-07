import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Admin from './admin';


ReactDOM.render(<Admin />, document.getElementById('root'));
registerServiceWorker();
