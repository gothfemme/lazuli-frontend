import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Splash from './Splash';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Navbar from './Navbar';
import UserSettings from './UserSettings';
import config from './firebaseconfig';
import { Auth, SplashRoute } from './Auth'


class App extends Component {
  state = {
    loggedIn: !!(localStorage.jwt && localStorage.user),
    searchTerm: ""
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

  handleSearch = (e) => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar loggedIn={this.state.loggedIn} searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} logIn={this.logIn} logOut={this.logOut}/>
          <div id="main">
          <SplashRoute exact path="/" component={Splash} logIn={this.logIn} loggedIn={this.state.loggedIn} />
          <Auth exact path="/dashboard" component={Dashboard} searchTerm={this.state.searchTerm} loggedIn={this.state.loggedIn} />
          <Auth exact path="/blog/:username" loggedIn={this.state.loggedIn} component={Profile}/>
          <Auth exact path="/settings" loggedIn={this.state.loggedIn} component={UserSettings} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;