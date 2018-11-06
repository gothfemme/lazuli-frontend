import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

class PostInteractions extends Component {

  render() {
    return (
      <div className="col-2">
      <ReactTooltip
        effect="solid"/>
        <div className="nav flex-column float-right text-center mt-2 text-muted" style={{fontSize: "1.75rem"}}>
            <Link to={"/blog/" + this.props.post.user.username}><img src={"/images/" + this.props.post.user.avatar} data-tip={this.props.post.user.username}
            className="nav-item" alt={this.props.post.username + "avatar"} style={{objectFit: "cover",
            width:"50px",
            height:"50px",
            borderRadius: "50%",
          cursor:"pointer"}} /></Link>
        </div>
      </div>
    );
  }

}

export default PostInteractions;