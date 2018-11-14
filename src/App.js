import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Splash from './Splash';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Navbar from './Navbar';
import UserSettings from './UserSettings';
import Api from './Api';
import config from './firebaseconfig';
import { Auth, SplashRoute } from './Auth'

const NoMatch = () => {
  return (
    <div className="container mt-5">
    <h1>No match found.</h1>
    <Link to="/">Go back.</Link>
    </div>
  )
}


class App extends Component {
  state = {
    loggedIn: !!(localStorage.jwt),
    searchTerm: "",
    visibleSplash: false,
    currentUser: {}
  }

  setCurrentUser = user => {
    this.setState({
      currentUser: user
    });
  }

  componentDidMount() {
    if (localStorage.jwt) {
      Api.getCurrentUser()
        .then(this.setCurrentUser)
    }
  }

  handleVisibleSplash = e => {
    this.setState({
      visibleSplash: !this.state.visibleSplash
    });
  }

  logIn = user => {
    this.setState({
      loggedIn: true,
      currentUser: user
    });
  }

  logOut = () => {
    localStorage.clear("jwt", "user")
    this.setState({
      loggedIn: false,
      currentUser: {}
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
          <Navbar currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} handleVisibleSplash={this.handleVisibleSplash} loggedIn={this.state.loggedIn} searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} logIn={this.logIn} logOut={this.logOut}/>
          <div id="main">
            <Switch>
              <SplashRoute exact path="/" visibleSplash={this.state.visibleSplash} handleVisibleSplash={this.handleVisibleSplash} component={Splash} logIn={this.logIn} loggedIn={this.state.loggedIn} />
              <Auth path="/dashboard" component={Dashboard} searchTerm={this.state.searchTerm} loggedIn={this.state.loggedIn} />
              <Auth path="/blog/:username" loggedIn={this.state.loggedIn} component={Profile}/>
              <Auth path="/settings" setCurrentUser={this.setCurrentUser} loggedIn={this.state.loggedIn} component={UserSettings} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;