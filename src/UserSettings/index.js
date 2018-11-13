import React, { Component } from 'react';
import validator from 'validator';
import Api from '../Api';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import TinySpinner from '../Components/TinySpinner';

class UserSettings extends Component {
  state = {
    user: {
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
      avatar: ""
    },
    isUploading: false,
    progress: 0,
    avatarURL: "",
    toggle: false,
    errors: { email: [null], username: [null], password: [null] }
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ user: { ...this.state.user, avatar: filename }, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

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

  render() {
    return (
      <div className="container pt-4">
        <form onSubmit={this.handleSubmit} id="sign-up">

          <div>
          <label className="text-center text-muted" style={{margin:"auto"}}>

            {this.state.isUploading ? <TinySpinner /> : (this.state.avatarURL ? <img src={this.state.avatarURL} className="border mb-2" style={{objectFit: "cover",
            width:"10rem",
            height:"10rem",
            borderRadius: "50%"}}/> : <h4 style={{margin:"auto"}}><i className="far fa-image mr-2"></i>Upload an image</h4>)}

            <FileUploader
              hidden
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </label>
        </div>

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
          <div class="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea className="form-control" name="bio" id="bio" rows="3"></textarea>
          </div>

          <div className="text-right">

            <button type="submit" className="btn btn-primary mt-1" disabled={!Object.values(this.state.errors).every(v=> v.length === 0)}>Submit</button>
          </div>
        </form>
      </div>
    );
  }

}

export default UserSettings;