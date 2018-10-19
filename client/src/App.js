import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';

import PrivateRoute from './components/common/PrivateRoute';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Comments from './components/dashboard/Comments';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';

if(localStorage.jwt){
  setAuthToken(localStorage.jwt);
  const decoded = jwt_decode(localStorage.jwt);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={Landing} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/post/:id" exact component={Comments} />
            <PrivateRoute path="/profile/:id" exact component={Profile} />
            <PrivateRoute path="/profile/edit/:id" exact component={EditProfile} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
