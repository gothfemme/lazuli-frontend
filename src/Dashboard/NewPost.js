import React, { Component } from 'react';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import EditTextButton from './EditTextButton';
import TinySpinner from '../Components/TinySpinner';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class NewPost extends Component {
  state = {
    post: {
      title: "",
      image: "",
      content: "",
    },
    isUploading: false,
    progress: 0,
    imageURL: "",
    toggle: false
  }

  handleClick = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  handleChange = (e) => {
    this.setState({
      post: { ...this.state.post,
        [e.target.name]: e.target.value
      }
    });
  }

  handleHTML = (e) => {
    this.setState({
      post: { ...this.state.post,
        content: e.target.value
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...this.state.post, content: sanitizeHtml(this.state.post.content), user_id: JSON.parse(localStorage.user).id, image: this.state.imageURL }
    this.props.handleSubmit(data)
    this.setState({
      post: {
        title: "",
        image: "",
        content: ""
      }
    })
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ post: { ...this.state.post, image: filename }, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imageURL: url }));
  };

  render() {
    return (<React.Fragment>
      <div className="row">
        <a className="col-1 offset-1 text-right" data-toggle="collapse" href="#new-post-form"><h3 className="text-muted">
          <i className="fas fa-plus"></i>
        </h3></a>
        <div className="col-10">
          <a id="dash-head-toggle" data-toggle="collapse" href="#new-post-form"><h3 className="text-muted"> What's on your mind?</h3></a>
          <form onSubmit={this.handleSubmit}
            className="collapse mb-3" id="new-post-form">
            <div>
              <div className="card mb-3" style={{minHeight:"15rem"}}>
              <label className="text-center text-muted" style={{margin:"auto"}}>

                {this.state.isUploading ? <TinySpinner /> : (this.state.imageURL ? <img className="card-img" src={this.state.imageURL} /> : <h4 style={{margin:"auto"}}><i className="far fa-image mr-2"></i>Upload an image</h4>)}

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
              <input name="title" onChange={this.handleChange} className="form-control form-control-lg" placeholder="Title..." value={this.state.post.title}/>
              <div className="">
                <div className="row justify-content-between" style={{fontSize:"1.25rem", marginLeft:"0", marginRight:"0"}}>
                    <EditTextButton cmd="italic" />
                    <EditTextButton cmd="bold" />
                    <EditTextButton cmd="underline" />
                    <EditTextButton cmd="strikeThrough" />
                    <EditTextButton cmd="insertUnorderedList" />
                    <EditTextButton cmd="insertOrderedList" />
                    <EditTextButton cmd="indent" />
                    <EditTextButton cmd="outdent" />
                    <EditTextButton cmd="justifyLeft" />
                    <EditTextButton cmd="justifyCenter" />
                    <EditTextButton cmd="justifyRight" />
                </div>
          </div>
              <ContentEditable
                className="form-control"
                style={{height:"25vh", overflowY: "scroll", wordWrap:"break-word"}}
                name="content"
                html={this.state.post.content}
                onChange={this.handleHTML}
                placeholder="Tell us your story..."
              />
              <div className="text-right">
                <button className="btn btn-primary mt-2" data-toggle="collapse" href="#new-post-form"><i className="fas fa-paper-plane mr-2"></i>Submit</button>
              </div>

            </div>
          </form>
                          <hr style={{width:"50%"}}/>
        </div>

      </div>


          </React.Fragment>);
  }
}

export default NewPost;