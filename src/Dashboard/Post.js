import React, { Component } from 'react';
import PostInteractions from './PostInteractions';

class Post extends Component {

  imageFormatter = () => {
    if (this.props.post.image) {
      return <img className="card-img-top" src={this.props.post.image} alt="" />
    }
  }

  render() {
    return (
      <div className="row">
        <PostInteractions post={this.props.post}/>
        <div className="col-10">
          <div className="card mb-3 shadow-sm">
            {this.imageFormatter()}
            <div className="card-body">
              <h4 className="card-title" style={{fontWeight: "bold"}}>{this.props.post.title}</h4>
              <p className="card-text" dangerouslySetInnerHTML={{__html: this.props.post.content}}></p>
              <p className="card-text"><small className="text-muted">Posted on {this.props.post.timestamp}</small></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Post;