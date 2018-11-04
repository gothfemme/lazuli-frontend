import React, { Component } from 'react';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import EditTextButton from './EditTextButton';

class NewPost extends Component {
  state = {
    post: {
      title: "",
      image: "",
      content: ""
    },
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
    const data = { ...this.state.post, content: sanitizeHtml(this.state.post.content), user_id: JSON.parse(localStorage.user).id }
    this.props.handleSubmit(data)
  }

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
              <input name="title" onChange={this.handleChange} className="form-control form-control-lg" placeholder="Title..."/>
              <div className="mt-2">
                <div className="row justify-content-center">
                  <div className="col-3">
                    <EditTextButton cmd="italic" />
                    <EditTextButton cmd="bold" />
                    <EditTextButton cmd="underline" />
                    <EditTextButton cmd="strikeThrough" />
                  </div>
                  <div className="col-3">
                    <EditTextButton cmd="insertUnorderedList" />
                    <EditTextButton cmd="insertOrderedList" />
                    <EditTextButton cmd="indent" />
                    <EditTextButton cmd="outdent" />
                  </div>
                  <div className="col-3">
                    <EditTextButton cmd="justifyLeft" />
                    <EditTextButton cmd="justifyCenter" />
                    <EditTextButton cmd="justifyRight" />
                  </div>
                </div>
          </div>
              <ContentEditable
                className="form-control form-control"
                style={{height:"25vh", overflowY: "scroll", wordWrap:"break-word"}}
                name="content"
                html={this.state.post.content}
                onChange={this.handleHTML}
                placeholder="Tell us your story..."
              />
              <div className="text-right">
                <button className="btn btn-primary mt-2">Submit <i class="fas fa-paper-plane"></i></button>
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