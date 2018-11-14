import React, {
  Component
} from 'react';
import Api from '../Api'

class Login extends Component {
  state = {
    email: "",
    password: "",
    loginError: false
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
      .then(this.getCurrentUser)
      .catch(error => {
        this.setState({
          loginError: true
        });
      })
  }

  getCurrentUser = () => {
    Api.getCurrentUser()
      .then(this.props.logIn)
  }


  render() {
    return (<div className = "dropdown-menu shadow-sm">
      <form className = "px-4 py-2"
      style = {
        {
          width: "250px"
        }
      }
      onSubmit = {
        this.handleSubmit
      }
      id = "login-form" >
      <div className = "form-group" >
      <label htmlFor = "login-email" > Email address </label>
      <input type = "text"
      className = {
        `form-control ${this.state.loginError ? 'is-invalid' : ''}`
      }
      name = "email"
      onChange = {
        this.handleChange
      }
      value = {
        this.state.email
      }
      id = "login-email"
      placeholder = "email@example.com" >

      </input>
      {this.state.loginError && ( <div className = "invalid-feedback" >
        Username or password is invalid. </div>)}
        </div>


        <div className = "form-group">
        <label htmlFor = "login-password"> Password </label>
        <input type = "password"
        className = {`form-control ${this.state.loginError ? 'is-invalid' : ''}`}
        name = "password"
        onChange = {
          this.handleChange
        }
        value = {
          this.state.password
        }></input>
        </div>

      <button className = "btn btn-primary"
      type = "submit"> Login
      </button>
      </form>
      </div>);
  }

}

export default Login;