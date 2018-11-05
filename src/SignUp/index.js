import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

class SignUp extends Component {
  state = {
    email: "",
    username: "",
    avatar: "",
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
      <div className="container-fluid px-4 pt-5 pb-2" style={{transition:"all 500ms ease-in"}}>
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
            <label htmlFor="dropzone">Avatar</label>
            <Dropzone
              accept="image/jpg, image/jpeg, image/png"
              multiple={false}
              className="dropzone text-center"
              id="dropzone"
              >
              <h3 className="my-5"><i class="fas fa-image mr-3"></i>Drag and drop image here, or click to browse.</h3>
            </Dropzone>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control" onChange={this.handleChange} value={this.state.password}></input>

          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input type="password" id="password_confirmation" name="password_confirmation" className="form-control" onChange={this.handleChange} value={this.state.password_confirmation}></input>
          </div>


          <button type="submit" className="btn btn-primary mt-1">Submit</button>
        </form>

      </div>
    );
  }

}

export default SignUp;