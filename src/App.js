import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Splash from './Splash';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Navbar from './Navbar'
import { Auth, SplashRoute } from './Auth'


class App extends Component {
  state = {
    loggedIn: !!(localStorage.jwt && localStorage.user)
  }

  logIn = () => {
    this.setState({
      loggedIn: true
    });
  }

  logOut = () => {
    localStorage.clear("jwt", "user")
    this.setState({
      loggedIn: false
    });
  }

  render() {
    console.log(this.state.loggedIn)
    return (
      <Router>
        <div>
          <Navbar loggedIn={this.state.loggedIn} logIn={this.logIn} logOut={this.logOut}/>
          <div id="main">
          <SplashRoute exact path="/" component={Splash} loggedIn={this.state.loggedIn} />
          <Auth path="/dashboard" component={Dashboard} loggedIn={this.state.loggedIn} />
          <Route path="/blog/:username" component={Profile}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;