import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import timeAgo from '../Components/TimeAgo';
import Api from '../Api';
import Comment from './Comment';
import CommentContainer from './CommentContainer';

class Post extends Component {

  state = {
    likeCount: this.props.post.original_post.like_count,
    reblogCount: this.props.post.original_post.reblog_count,
    rebloggedByMe: !!(this.props.post.is_reblog && this.props.post.user.username === JSON.parse(localStorage.user).username),
    commentsToggle: false
  }

  imageFormatter = () => {
    if (this.props.post.original_post.image) {
      return <img className="card-img" style={{borderRadius:"0"}} src={this.props.post.original_post.image} alt="" />
    }
  }

  toggleLike = () => {
    this.props.likedByMeInPast ? Api.unlike({ post_id: this.props.post.original_post.id }).then(() => this.props.removeLike(this.props.post)) : Api.like({ post_id: this.props.post.original_post.id }).then(() => this.props.addLike(this.props.post))
  }

  toggleComments = () => {
    this.setState({
      commentsToggle: !this.state.commentsToggle
    });
  }

  toggleReblog = () => {
    if (this.props.rebloggedByMeInPast) {
      Api.unreblog({ post_id: this.props.post.original_post.id }).then(() => {
        if (this.state.rebloggedByMe && this.props.onDashboard) {
          this.props.removeReblog(this.props.post)
        } else {
          this.props.cleanUpReblogs(this.props.post)
          this.props.onDashboard && this.props.removeOtherReblogs(this.props.post)
        }
      })
    } else {
      Api.reblog({ post_id: this.props.post.original_post.id }).then(r => r.json()).then(post => this.props.addReblog(post))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.rebloggedByMeInPast !== prevProps.rebloggedByMeInPast) {
      this.props.rebloggedByMeInPast ? this.setState({
        reblogCount: this.state.reblogCount + 1
      }) : this.setState({
        reblogCount: this.state.reblogCount - 1
      });
    }

    if (this.props.likedByMeInPast !== prevProps.likedByMeInPast) {
      this.props.likedByMeInPast ? this.setState({
        likeCount: this.state.likeCount + 1
      }) : this.setState({
        likeCount: this.state.likeCount - 1
      });
    }
  }

  render() {
      const rebloggedByMeInPast = this.props.rebloggedByMeInPast
      return (
          <div className="row" style={{transition:"all 500ms ease-in"}}>
        <div className="col-2 pr-0">

          <div className="nav flex-column float-right text-center mt-2 text-muted" style={{fontSize: "1.75rem"}}>
              <Link to={"/blog/" + this.props.post.user.username}><img src={"/images/" + this.props.post.user.avatar}
              className="nav-item border" alt={this.props.post.username + "avatar"} style={{objectFit: "cover",
              width:"4rem",
              height:"4rem",
              borderRadius: "50%",
            cursor:"pointer"}} /></Link>
            {this.props.post.is_reblog && (<i className="fas fa-retweet nav-item mr-1 text-success" style={{zPosition:"100", position: "relative",
    marginTop: "-1.5rem",
    marginLeft: "4rem"}}></i>)}
          </div>
        </div>
        <div className="col-10">
          <div className="card mb-4" style={{transition:"height 500ms ease"}}>
              <div className="card-header text-muted bg-white">
                <span className="mr-2">
                <Link to={"/blog/" + this.props.post.user.username} style={{color:"inherit", textDecoration:"none"}} >{this.props.post.user.username}</Link></span>
                {this.props.post.is_reblog && <span className="mr-2"><i className="fas fa-retweet mr-2"></i> <Link to={"/blog/" + this.props.post.original_post.author.username} style={{color:"inherit", textDecoration:"none"}} >{this.props.post.original_post.author.username}</Link></span>}

                {this.props.isAuthor && <div className="dropdown" style={{float:"right"}}>
                  <span data-toggle="dropdown" style={{cursor:"pointer"}}><i className="fas fa-ellipsis-h"></i></span>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="dropdown-item" style={{cursor:"pointer"}} >Edit</div>
                    <div onClick={() => this.props.deletePost(this.props.post)} className="dropdown-item" style={{cursor:"pointer"}} >Delete</div>

                  </div>
                </div>}


          </div>
              {this.imageFormatter()}
            <div className="card-body">
              <h4 className="card-title" style={{fontWeight: "bold"}}>{this.props.post.original_post.title}</h4>
              <p className="card-text" dangerouslySetInnerHTML={{__html: this.props.post.original_post.content}}></p>
            </div>


              {this.state.commentsToggle ? <CommentContainer currentUser={this.props.currentUser} post={this.props.post.original_post}/> : null}



            <div className="card-footer text-muted" style={{zIndex: '200'}}>
              <span>{timeAgo(this.props.post.created_at)}</span>
              <span className="float-right">
                <span onClick={this.toggleComments} style={{cursor:"pointer"}} className="pr-3">
                  {this.state.commentsToggle ? <i className="fas fa-comments text-primary"></i> : <i className="far fa-comments"></i>}
                </span>
                <span className="pr-3"><i className={"fas fa-retweet nav-item mr-1" + (rebloggedByMeInPast ? " text-success" : '')} style={{cursor:"pointer"}} onClick={this.toggleReblog}></i> {this.state.reblogCount}</span>
                <span><i onClick={this.toggleLike} className={this.props.likedByMeInPast ? "fas fa-heart nav-item mr-1 text-danger" : "far fa-heart nav-item mr-1"} style={{cursor:"pointer"}}></i> {this.state.likeCount}</span>
              </span>
          </div>
        </div>
      </div> < /div>
    );
  }

}

export default Post;