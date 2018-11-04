import React, { Component } from 'react';

class PostInteractions extends Component {

  render() {
    console.log(this.props.post)
    return (
      <div className="col-2">
        <div className="nav flex-column float-right text-center mt-2 text-muted" style={{fontSize: "1.75rem"}}>
            <img src={"/images/" + this.props.post.user.avatar}
            className="nav-item" alt={this.props.post.username + "avatar"} style={{objectFit: "cover",
            width:"50px",
            height:"50px",
            borderRadius: "50%"}}/>
            <i className="fas fa-heart nav-item mt-3"></i>
            <i className="fas fa-retweet nav-item mt-3"></i>
            <i className="fas fa-reply nav-item mt-3"></i>
        </div>
      </div>
    );
  }

}

export default PostInteractions;