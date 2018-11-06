import React, { Component } from 'react';
import Api from '../Api';

class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {
      user: {
        ...this.state
      }
    }
    const tokenData = {
      email: this.state.email,
      password: this.state.password
    }
    Api.createUser(data)
      .catch(function(error) {
        return undefined
      })
      .then(() => {
        Api.getToken(tokenData)
          .catch(function(error) {
            return undefined
          })
          .then(() => Api.getCurrentUser(tokenData))
          .then(this.props.logIn)
      })
  }

  handleFile = (e) => {
    e.persist()
    console.log(e.target.files[0])
    this.setState({
      avatar: e.target.files[0]
    });
  }

  render() {
    return (
      <div className="container px-4 pb-2" style={{transition:"all 500ms ease-in", paddingTop:"7%"}}>
      <div className="jumbotron" id="sign-up-back">
        <h2>Create an account.</h2>
        <form onSubmit={this.handleSubmit} id="sign-up">
          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className="form-control" onChange={this.handleChange} value={this.state.email} placeholder="example@email.com"></input>

            </div>
            <div className="col form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" className="form-control" onChange={this.handleChange} value={this.state.username}></input>
            </div>


          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control" onChange={this.handleChange} value={this.state.password}></input>

          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input type="password" id="password_confirmation" name="password_confirmation" className="form-control" onChange={this.handleChange} value={this.state.password_confirmation}></input>
          </div>

          <div className="text-right">

            <button type="submit" className="btn btn-primary mt-1">Submit</button>
          </div>
        </form>
      </div>
      </div>
    );
  }

}

export default SignUp;