import React, { Component } from 'react';
import Api from '../Api'

class Login extends Component {
  state = {
    email: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    Api.getToken(data)
      .catch(function(error) {
        return undefined
      })
      .then(this.getCurrentUser)
  }

  getCurrentUser = () => {
    console.log("hit getCurrentUser")
    Api.getCurrentUser()
      .catch(function(error) {
        return undefined
      })
      .then(() => {
        this.props.logIn()
        this.props.toggleDropdown()
      })
  }


  render() {
    return (
      <form className="card p-4 dark-dropdown text-white shadow-sm"
        onSubmit={this.handleSubmit} id="login-form"
        >
        <div className="form-group">
          <label htmlFor="login-email">Email address</label>
          <input type="text" className="form-control" name="email" onChange={this.handleChange} value={this.state.email} id="login-email" placeholder="email@example.com"></input>
        </div>


        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input type="password" className="form-control" name="password" onChange={this.handleChange} value={this.state.password}></input>
        </div>

        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    );
  }

}

export default Login;