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
    this.setState({
      post: {
        title: "",
        image: "",
        content: ""
      }
    })
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
                className="form-control form-control"
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