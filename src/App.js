import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import axios from 'axios'
import 'antd/dist/antd.css';
import { DesktopVersion, MobileVersion } from './components/Responsive'
import Main from './components/main/Main'
import Login from './components/shared/Login'
import Register from './components/shared/Register'
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/shared/PrivateRoute'
import { BrowserRouter } from 'react-router-dom'
import browserHistory from 'history/createBrowserHistory'
const history = browserHistory();
function App() {

  return (
    <Provider store={store}>
      <BrowserRouter >
        <div  >
          <Main />
          {/*  {
            lscache.get('usertoken') ? <Redirect to="/main" /> : <Redirect to="/login" />
          }
          <Switch>
            <PrivateRoute path="/main" component={() => <Main />} />
            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/register" component={() => <Register />} />
          </Switch>
 */}
        </div>
      </BrowserRouter>
    </Provider >

  );
}

export default App;
