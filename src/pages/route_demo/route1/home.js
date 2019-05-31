import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import About from './about';
import Topics from './topics';
import Main from './main';

export default class Home extends React.Component{
  render () {
    return (
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          <hr/>
          <Route exact path="/" component={Main}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/topics" component={Topics}></Route>
        </div>
      </HashRouter>
    );
  }
}