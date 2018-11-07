import React, { Component } from 'react';
import Api from '../Api';

class Post extends Component {
  state = {
    likeCount: this.props.post.likes.length,
    liked: !!(this.props.post.likes.find(like => like.user_id === JSON.parse(localStorage.user).id))
  }

  imageFormatter = () => {
    if (this.props.post.image) {
      return <img className="card-img-top" src={this.props.post.image} alt="" />
    }
  }

  // liked = () => {
  //   return !!(this.props.post.likes.find(like => like.user_id === JSON.parse(localStorage.user).id))
  // }

  toggleLike = () => {
    this.state.liked ? Api.unlike({ post_id: this.props.post.id }) : Api.like({ post_id: this.props.post.id })

    this.setState({
      likeCount: (this.state.liked ? this.state.likeCount - 1 : this.state.likeCount + 1),
      liked: !this.state.liked
    });
  }

  render() {
    let reblogged = false
    return (
      <div className="card mb-4">
            {this.imageFormatter()}
            <div className="card-body">
              <h4 className="card-title" style={{fontWeight: "bold"}}>{this.props.post.title}</h4>
              <p className="card-text" dangerouslySetInnerHTML={{__html: this.props.post.content}}></p>
            </div>
            <div className="card-footer text-muted">
              <span><small>Posted on {this.props.post.timestamp}</small></span>
              <span className="float-right">
                <span className="pr-3"><i className="fas fa-comment nav-item"></i></span>
                <span className="pr-3"><i className={"fas fa-retweet nav-item mr-1" + (reblogged ? ' text-success' : '')}></i> 0</span>
                <span><i onClick={this.toggleLike} className={this.state.liked ? "fas fa-heart nav-item mr-1 text-danger" : "far fa-heart nav-item mr-1"} style={{cursor:"pointer"}}></i> {this.state.likeCount}</span>
              </span>
          </div>
        </div>
    );
  }

}

export default Post;