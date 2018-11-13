import React, { Component } from 'react';
import validator from 'validator';
import Api from '../Api';

class SignUp extends Component {
  state = {
    user: {
      email: "",
      username: "",
      password: "",
      password_confirmation: ""
    },
    errors: { email: [null], username: [null], password: [null] }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      user: { ...this.state.user, [name]: value }
    }, () => {
      this.validateSwitch(name, value)
    })
  }

  validateSwitch = (name, value) => {
    let errors = []
    switch (name) {
      case 'email':
        if (!validator.isEmail(value)) {
          errors.push("Email is invalid.")
        }
        this.setState({
          errors: { ...this.state.errors, email: errors }
        });
        return
      case 'password':
      case 'password_confirmation':
        if (!validator.isLength(this.state.user.password, { min: 8, max: undefined })) {
          errors.push("Password must be at least 8 characters long.")
        }
        if (!validator.equals(this.state.user.password, this.state.user.password_confirmation)) {
          errors.push("Passwords must match.")
        }
        this.setState({
          errors: { ...this.state.errors, password: errors }
        });
        break;
      case 'username':
        if (!validator.isLength(value, { min: 1, max: 24 })) {
          errors.push("Username must be between 1 and 24 characters")
        }
        if (!validator.isAlphanumeric(value)) {
          errors.push("Username is invalid.")
        }
        Api.validUsername(value)
          .then(json => {
            if (!json.is_valid) {
              errors.push("That username is taken.")
            }
            this.setState({
              errors: { ...this.state.errors, username: errors }
            });
          })
        break;
      default:
        return
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {
      user: {
        ...this.state.user
      }
    }
    const tokenData = {
      email: this.state.user.email,
      password: this.state.user.password
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
      <div className="container px-4 pb-2" style={{transition:"all 500ms ease-in", paddingTop:"5rem"}}>
      <div className="jumbotron" id="sign-up-back">
        <h2 className="mb-2">Create an account.</h2>
        <form onSubmit={this.handleSubmit} id="sign-up">
          <div className="form-row">
            <div className="col form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className={`form-control ${this.state.user.email === '' ? '' :(this.state.errors.email.length === 0 ? 'is-valid' : 'is-invalid')}`} onChange={this.handleChange} value={this.state.user.email} placeholder="example@email.com" required></input>
              <div className="invalid-feedback">
                {this.state.errors.email.join(" ")}
              </div>

            </div>
            <div className="col form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" className={`form-control ${  this.state.user.username === '' ? '' : (this.state.errors.username.length === 0 ? 'is-valid' : 'is-invalid')}`} onChange={this.handleChange} value={this.state.user.username} required></input>
              <div className="invalid-feedback">
                {this.state.errors.username.join(" ")}
              </div>
            </div>


          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className={`form-control ${this.state.user.password === '' ? '' :(this.state.errors.password.length === 0 ? 'is-valid' : 'is-invalid')}`} onChange={this.handleChange} value={this.state.user.password} required></input>
            <div className="invalid-feedback">
              {this.state.errors.password.join(" ")}
            </div>

          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input type="password" id="password_confirmation" name="password_confirmation" className={`form-control ${this.state.user.password_confirmation === '' ? '' :(this.state.errors.password.length === 0 ? 'is-valid' : 'is-invalid')}`} onChange={this.handleChange} value={this.state.user.password_confirmation} required></input>
          </div>

          <div className="text-right">

            <button type="submit" className="btn btn-primary mt-1" disabled={!Object.values(this.state.errors).every(v=> v.length === 0)}>Submit</button>
          </div>
        </form>
      </div>
      </div>
    );
  }

}

export default SignUp;