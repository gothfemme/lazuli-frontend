import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import timeAgo from '../Components/TimeAgo';
import Api from '../Api';

class Post extends Component {

  state = {
    likeCount: this.props.post.original_post.like_count,
    reblogCount: this.props.post.original_post.reblog_count,
    liked: !!(this.props.post.original_post.likes.includes(JSON.parse(localStorage.user).id)),
    rebloggedByMe: !!(this.props.post.is_reblog && this.props.post.user.username === JSON.parse(localStorage.user).username),
    rebloggedByMeInPast: !!(this.props.post.original_post.reblogs.includes(JSON.parse(localStorage.user).id))
  }

  imageFormatter = () => {
    if (this.props.post.original_post.image) {
      return <img className="card-img-top" src={this.props.post.original_post.image} alt="" />
    }
  }

  toggleLike = () => {
    this.state.liked ? Api.unlike({ post_id: this.props.post.original_post.id }) : Api.like({ post_id: this.props.post.original_post.id })

    this.setState({
      likeCount: (this.state.liked ? this.state.likeCount - 1 : this.state.likeCount + 1),
      liked: !this.state.liked
    });
  }

  toggleReblog = () => {
    this.state.rebloggedByMeInPast ? Api.unreblog({ post_id: this.props.post.original_post.id }).then(() => this.state.rebloggedByMe ? this.props.removeReblog(this.props.post) : this.props.cleanUpReblogs(this.props.post)) : Api.reblog({ post_id: this.props.post.original_post.id }).then(r => r.json()).then(post => this.props.addReblog(post))
    this.setState({
      reblogCount: (this.state.rebloggedByMeInPast ? this.state.reblogCount - 1 : this.state.reblogCount + 1),
      rebloggedByMeInPast: !this.state.rebloggedByMeInPast
    });

  }

  // componentDidUpdate(prevProps, prevState) {
  //   const likeCheck = !!(this.props.post.original_post.reblogs.includes(JSON.parse(localStorage.user).id))
  //   if (likeCheck !== this.state.rebloggedByMeInPast) {
  //     this.setState({
  //       rebloggedByMeInPast: likeCheck
  //     });
  //   }
  // }

  render() {
      const rebloggedByMeInPast = !!(this.props.post.original_post.reblogs.includes(parseInt(JSON.parse(localStorage.user).id)))
      console.log(rebloggedByMeInPast)
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
          <div className="card mb-4">
              <div className="card-header text-muted bg-white">
                <span className="mr-2">
                {this.props.post.user.username}</span>
                {this.props.post.is_reblog && <span className="mr-2"><i className="fas fa-retweet mr-2"></i> {this.props.post.original_post.author.username}</span>}


          </div>
              {this.imageFormatter()}
            <div className="card-body">
              <h4 className="card-title" style={{fontWeight: "bold"}}>{this.props.post.original_post.title}</h4>
              <p className="card-text" dangerouslySetInnerHTML={{__html: this.props.post.original_post.content}}></p>
            </div>
            <div className="card-footer text-muted">
              <span>{timeAgo(this.props.post.created_at)}</span>
              <span className="float-right">
                <span className="pr-3"><i className="fas fa-comment nav-item"></i></span>
                <span className="pr-3"><i className={"fas fa-retweet nav-item mr-1" + (rebloggedByMeInPast ? " text-success" : '')} style={{cursor:"pointer"}} onClick={this.toggleReblog}></i> {this.state.reblogCount}</span>
                <span><i onClick={this.toggleLike} className={this.state.liked ? "fas fa-heart nav-item mr-1 text-danger" : "far fa-heart nav-item mr-1"} style={{cursor:"pointer"}}></i> {this.state.likeCount}</span>
              </span>
          </div>
        </div>
      </div> < /div>
    );
  }

}

export default Post;