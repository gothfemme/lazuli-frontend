import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import Login from './Login';

class Navbar extends Component {
  state = {
    dropdown: false
  }

  toggleDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    });
  }

  render() {
    console.log(this.props)
    const loggedIn = this.props.loggedIn
    return (
      <nav className={this.props.location.pathname === "/" ? "navbar navbar-expand fixed-top navbar-dark" : "navbar navbar-expand fixed-top navbar-light navbar-custom"}>
          <NavLink exact to={loggedIn ? "/dashboard" : "/"} className="navbar-brand">laz·u·li</NavLink>

          <div className="navbar-nav ml-auto">
            {loggedIn && <form className="form-inline my-2 my-lg-0 pr-5">
              <div>
                <input className="form-control mr-sm-2 border-0" type="search" style={{backgroundColor:"#aaaaaa44", borderRadius: "2em", width:"30vw",paddingLeft: "20px", paddingRight:"35px"
                }} placeholder="Search..." />
                <i className="fas fa-search" id="search-button"></i>

              </div>
            </form>}
            {loggedIn && <img src={"/images/" + JSON.parse(localStorage.user).avatar}
            onClick={this.toggleDropdown} style={{objectFit: "cover",
              width:"50px",
              height:"50px",
              borderRadius: "50%",
              cursor: "pointer"}}/>}
              {!loggedIn && <a className="nav-item nav-link text-light" onClick={this.toggleDropdown} style={{cursor:"pointer"}}>Sign In</a>}
              {!loggedIn && <button className="btn btn-outline-light nav-item ml-4">Create Account</button>}
              <div id="nav-dropdown">

                {this.state.dropdown && loggedIn ?(
                  <div className="card dark-dropdown text-white">
                    <ul className="list-group dark-dropdown list-group-flush">
                      <li className="list-group-item dark-dropdown list-group-item-action">{JSON.parse(localStorage.user).username}</li>
                      <li className="list-group-item dark-dropdown list-group-item-action" onClick={() => {
                        this.toggleDropdown()
                        this.props.logOut()
                      }}>Sign Out</li>
                    </ul>
                </div>
                ) : (
                  null
                )}
              {(this.state.dropdown && !loggedIn) && <Login toggleDropdown={this.toggleDropdown} loggedIn={loggedIn} logIn={this.props.logIn} />}

              </div>
          </div>
        </nav>
    );
  }

}

export default withRouter(Navbar);