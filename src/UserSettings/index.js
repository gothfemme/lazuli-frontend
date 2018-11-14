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
      avatar: "",
      bio: ""
    },
    original: {
      email: "",
      username: "",
      avatar: "",
      bio: ""
    },
    isUploading: false,
    progress: 0,
    avatarURL: "https://firebasestorage.googleapis.com/v0/b/lazuli-d0e49.appspot.com/o/images%2Fdefault_user.jpeg?alt=media&token=84c71201-66f9-404c-943f-43eabc7be3c9",
    toggle: false,
    update_success: false,
    errors: { email: [], username: [], bio: [] }
  }

  componentDidMount() {
    Api.getCurrentUser()
      .then(user => {
        this.setState({
          user: {
            email: user.email,
            username: user.username,
            bio: user.bio
          },
          original: {
            email: user.email,
            username: user.username,
            bio: user.bio
          },
          avatarURL: user.avatar
        });
      })
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
        if (this.state.user.email !== this.state.original.email) {
          if (!validator.isEmail(value)) {
            errors.push("Email is invalid.")
          }
        }
        this.setState({
          errors: { ...this.state.errors, email: errors }
        });
        return
        // case 'password':
        // case 'password_confirmation':
        //   if (!validator.isLength(this.state.user.password, { min: 8, max: undefined })) {
        //     errors.push("Password must be at least 8 characters long.")
        //   }
        //   if (!validator.equals(this.state.user.password, this.state.user.password_confirmation)) {
        //     errors.push("Passwords must match.")
        //   }
        //   this.setState({
        //     errors: { ...this.state.errors, password: errors }
        //   });
        //   break;
      case 'username':
        if (this.state.user.username !== this.state.original.username) {

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
        }
        break;
      case 'bio':
        if (!validator.isLength(value, { min: 0, max: 240 })) {
          errors.push("Bio is too long.")
        }
        this.setState({
          errors: { ...this.state.errors, bio: errors }
        });
        break;
      default:
        return
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {
      user: {
        ...this.state.user,
        avatar: this.state.avatarURL
      }
    }
    Api.patchUser(data)
      .then(this.props.setCurrentUser)
      .then(() => this.setState({
        update_success: true
      }))
  }

  render() {
    return (
      <div className="container pl-2 pt-5">
        <div className="row mb-4">
          <div className="col offset-2">

            <h2>Account Settings</h2>
          </div>
        </div>
      {/* <hr /> */}
        <form onSubmit={this.handleSubmit} id="sign-up">
          <div className="form-row">
          <div className="col-3 offset-1 text-center">
            <p>Avatar</p>
            {this.state.isUploading ? <TinySpinner /> :
(            <label>
            <div className="avatar-wrapper">
            <img src={this.state.avatarURL} className="border mb-2 rounded-circle" style={{objectFit: "cover",
            height:"10rem", width:"10rem", cursor:"pointer"}}/>
            <div className="avatar-hover">
              <i className="fas fa-plus fa-4x"></i>
            </div>
          </div>
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
            </label>)}
        </div>

        <div className="col-6">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className={`form-control ${this.state.user.email === this.state.original.email ? '' :(this.state.errors.email.length === 0 ? 'is-valid' : 'is-invalid')}`} onChange={this.handleChange} value={this.state.user.email} placeholder="example@email.com" required></input>
              <div className="invalid-feedback">
                {this.state.errors.email.join(" ")}
              </div>

            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" className={`form-control ${this.state.user.username === this.state.original.username ? '' : (this.state.errors.username.length === 0 ? 'is-valid' : 'is-invalid')}`} onChange={this.handleChange} value={this.state.user.username} required></input>
              <div className="invalid-feedback">
                {this.state.errors.username.join(" ")}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label> <textarea className={`form-control ${this.state.user.bio === this.state.original.bio ? '' : (this.state.errors.bio.length === 0 ? 'is-valid' : 'is-invalid')}`}
                name = "bio"
                id = "bio"
                onChange={this.handleChange} value = { this.state.user.bio } rows = "3" >
              </textarea>
            </div>
            <div className = "text-right">

              <button type="submit" className="btn btn-primary mt-1" disabled={!Object.values(this.state.errors).every(v=> v.length === 0)}>Update</button>
            </div>
          </div>

          </div>


    </form>
    {this.state.update_success ? <div class="alert alert-success alert-dismissible fade show mt-4" role="alert">
Information successfully updated!
<button onClick={() => this.setState({
  update_success: false
})} type="button" class="close" data-dismiss="alert" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div> : null}
  </div>
    );
  }

}

export default UserSettings;