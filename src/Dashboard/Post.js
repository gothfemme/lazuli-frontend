import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import timeAgo from '../Components/TimeAgo';
import Api from '../Api';

class Post extends Component {

  state = {
    likeCount: this.props.post.like_count,
    retweetCount: this.props.post.retweet_count,
    liked: !!(this.props.post.likes.find(like => like.user_id === JSON.parse(localStorage.user).id))
  }

  imageFormatter = () => {
    if (this.props.post.image) {
      return <img className="card-img-top" src={this.props.post.image} alt="" />
    }
  }

  toggleLike = () => {
    this.state.liked ? Api.unlike({ post_id: this.props.post.id }) : Api.like({ post_id: this.props.post.id })

    this.setState({
      likeCount: (this.state.liked ? this.state.likeCount - 1 : this.state.likeCount + 1),
      liked: !this.state.liked
    });
  }

  footerText = () => {
    if (this.props.post.is_reblog) {
      return `Reblogged by ${this.props.post.reblogged_by.username}, originally posted by ${this.props.post.user.username} on ${this.props.post.timestamp}`
    } else {
      return `Posted by ${this.props.post.user.username} on ${this.props.post.timestamp}`
    }
  }

  render() {
      let reblogged = this.props.post.is_reblog
      return (
          <div className="row">
        <div className="col-2 pr-0">

          <div className="nav flex-column float-right text-center mt-2 text-muted" style={{fontSize: "1.75rem"}}>
              <Link to={"/blog/" + this.props.post.user.username}><img src={"/images/" + this.props.post.user.avatar}
              className="nav-item border" alt={this.props.post.username + "avatar"} style={{objectFit: "cover",
              width:"4rem",
              height:"4rem",
              borderRadius: "50%",
            cursor:"pointer"}} /></Link>
            {reblogged && (<i className="fas fa-retweet nav-item mr-1 text-success" style={{zPosition:"100", position: "relative",
    marginTop: "-1.5rem",
    marginLeft: "4rem"}}></i>)}
          </div>
        </div>
        <div className="col-10">
          <div className="card mb-4">
              <div className="card-header text-muted bg-white">
                <span className="mr-2">
                {reblogged ? this.props.post.reblogged_by.username : this.props.post.user.username}</span>
                {reblogged && <span className="mr-2"><i className="fas fa-retweet mr-2"></i> {this.props.post.user.username}</span>}


          </div>
              {this.imageFormatter()}
            <div className="card-body">
              <h4 className="card-title" style={{fontWeight: "bold"}}>{this.props.post.title}</h4>
              <p className="card-text" dangerouslySetInnerHTML={{__html: this.props.post.content}}></p>
            </div>
            <div className="card-footer text-muted">
              <span>{timeAgo(this.props.post.created_at)}</span>
              <span className="float-right">
                <span className="pr-3"><i className="fas fa-comment nav-item"></i></span>
                <span className="pr-3"><i className={"fas fa-retweet nav-item mr-1" + (reblogged ? ' text-success' : '')}></i> {this.state.retweetCount}</span>
                <span><i onClick={this.toggleLike} className={this.state.liked ? "fas fa-heart nav-item mr-1 text-danger" : "far fa-heart nav-item mr-1"} style={{cursor:"pointer"}}></i> {this.state.likeCount}</span>
              </span>
          </div>
        </div>
      </div> < /div>
    );
  }

}

export default Post;