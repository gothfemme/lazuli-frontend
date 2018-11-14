import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'
import Login from './Login';
import Notification from './Notification';
import Api from '../Api';

class Navbar extends Component {
  state = {
    dropdown: false,
    notifications: [],
    isLoading: true,
    lastRead: localStorage.lastRead
  }

  getNotifications = () => {
    console.log('notification hit')
    console.log(this.state.notifications)
    return this.state.notifications.map(notification => <Notification isNew={!!new Date(notification.created_at) > new Date(parseInt(this.state.lastRead))} key={notification.id} notification={notification}/>)
  }

  toggleDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  }

  componentDidMount() {
    localStorage.jwt && Api.getNotifications()
      .then(notifications => this.setState({
        isLoading: false,
        notifications: notifications
      }))
  }

  render() {
    const loggedIn = this.props.loggedIn
    let username
    if (loggedIn) {
      username = this.props.currentUser.username
    }
    return (
      <nav className={this.props.location.pathname === "/" ? "navbar navbar-expand fixed-top navbar-dark" : "navbar navbar-expand fixed-top navbar-light border-bottom navbar-custom shadow-sm"} style={{height: "5rem"}}>
          <Link to={ loggedIn ? "/dashboard" : "/"} className="navbar-brand ml-2" style={this.props.location.pathname === "/" ? {color:"#FFF"} : {color:"#007bff"}}>Laz·u·li</Link>
          {loggedIn && <Route path="/dashboard" render={() => (
            <form onSubmit={e => e.preventDefault()} className="form-inline my-2 my-lg-0 pl-2">
              <div>
                <input className="form-control mr-sm-2 border" type="search" style={{backgroundColor:"rgba(214, 214, 214, 0.267)", borderRadius: "2em", width:"30vw",paddingLeft: "20px", paddingRight:"35px"
                }} onChange={this.props.handleSearch} value={this.props.searchTerm} placeholder="Search..." />
                <i className="fas fa-search" id="search-button"></i>

              </div>
            </form>
          )}/>}
          <div className="navbar-nav ml-auto pr-1">
              {!loggedIn && (
                <div className="nav-item dropdown">
                <button className="btn btn-link nav-link text-light" style={{cursor:"pointer", fontWeight:"bold"}} data-toggle="dropdown">Sign In</button>
                <Login loggedIn={loggedIn} logIn={this.props.logIn} />

              </div>
              )}

              {!loggedIn && <button onClick={this.props.handleVisibleSplash} className="btn btn-outline-light nav-item ml-4">Create Account</button>}



              {loggedIn && (
                <React.Fragment>
                  <div className="nav-item dropdown">
                  <span onClick={() => {localStorage.setItem("lastRead", Date.now())
                    this.setState({
                      lastRead: localStorage.lastRead
                    });
                  }}
                    className="nav-item nav-link far fa-bell fa-2x mt-2 mr-4"
                    role="button" style={{cursor:"pointer"}} data-toggle="dropdown"
                    ></span>
                    {localStorage.lastRead && this.state.notifications.filter(n => new Date(n.created_at) > new Date(parseInt(this.state.lastRead))).length > 0 ? (<span style={{position:"absolute", top:"1.5rem", left:"1.5rem"}} className="badge badge-pill badge-danger">{this.state.notifications.filter(n => new Date(n.created_at) > new Date(parseInt(this.state.lastRead))).length}</span>) : null}

                    <div className="dropdown-menu dropdown-menu-right pb-0 shadow-sm" aria-labelledby="navbarDropdownMenuLink" style={{width:"25rem", height:"40rem"}}>
                        <h6 className="dropdown-header">Notifications</h6>
                        <ul className="list-unstyled mb-0" style={{overflowY:"scroll"}}>

                          {this.state.isLoading && this.state.notifications.length === 0 ? "No notifications." : this.getNotifications()}
                        </ul>
                    </div>


                </div>


                  <div className="nav-item dropdown">
                    <img className="nav-link" src={this.props.currentUser.avatar} alt="user avatar" style={{objectFit: "cover",
                    width:"4rem",
                    height:"4rem",
                    borderRadius: "50%",
                    cursor: "pointer"}} id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <div className="dropdown-menu dropdown-menu-right shadow-sm" aria-labelledby="navbarDropdownMenuLink">
                      <Link to={"/blog/" + this.props.currentUser.username} className="dropdown-item">Profile</Link>
                      <Link to='/settings' className="dropdown-item">Settings</Link>
                      <div style={{cursor:"pointer"}} className="dropdown-item" onClick={() => {
                        this.props.logOut()
                      }}>Sign Out</div>
                    </div>
                  </div>
                </React.Fragment>
              )}
          </div>
        </nav>
    );
  }

}

export default withRouter(Navbar);