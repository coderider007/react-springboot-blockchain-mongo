import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import './css/bootstrap.min.css';
import HomePage from './components/HomePage';
import App from './components/App';
import Login from './components/Login';
//import './css/App.css';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={HomePage} />
        <Route path='/dashboard' component={App} />
        <Route path='/login' component={Login} />
      </div>
  </Router>,
  document.getElementById('root')
);
