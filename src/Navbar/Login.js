import React, { Component } from 'react';

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
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        auth: {
          email: this.state.email,
          password: this.state.password
        }
      })
    }
    fetch('http://localhost:3000/user/token', options)
      .then(r => r.json())
      .then(r => {
        localStorage.setItem("jwt", r.jwt)
        this.setState({
          email: "",
          password: ""
        })
      })
      .then(this.getCurrentUser)
      .catch(function(error) {
        return undefined
      })
  }

  getCurrentUser = () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.getItem("jwt"))
      }
    }
    fetch('http://localhost:3000/users/current', options)
      .then(r => r.json())
      .then(user => {
        localStorage.setItem("user", JSON.stringify(user))
        this.props.logIn()
        this.props.toggleDropdown()
      })
      .catch(function(error) {
        return undefined
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