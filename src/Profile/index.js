import React, { Component } from 'react';
// import ProfilePost from './ProfilePost';
import Spinner from '../Components/Spinner'
import Api from '../Api';
import Post from '../Dashboard/Post';

class Profile extends Component {
  state = {
    current_user: {},
    user: {},
    posts: [],
    isLoading: true,
    hover: false
  }

  addReblog = post => {
    this.setState({
      current_user: { ...this.state.current_user, reblogs: [post.original_post.id, ...this.state.current_user.reblogs] }
    });
  }

  deletePost = post => {
    this.setState({
      posts: this.state.posts.filter(dashPost => dashPost.original_post.id !== post.original_post.id)
    })
    Api.deletePost(post.original_post.id)
  }

  cleanUpReblogs = (post) => {
    this.setState({
      current_user: { ...this.state.current_user,
        reblogs: this.state.current_user.reblogs.filter(post_id => post_id !== post.original_post.id)
      }
    });
    return true
  }

  removeReblog = post => {
    this.setState({
      posts: this.state.posts.filter(dashPost => dashPost !== post)
    }, () => this.cleanUpReblogs(post));
  }

  addLike = post => {
    this.setState({
      current_user: { ...this.state.current_user, likes: [post.original_post.id, ...this.state.current_user.likes] }
    });
  }

  removeLike = (post) => {
    this.setState({
      current_user: { ...this.state.current_user,
        likes: this.state.current_user.likes.filter(post_id => post_id !== post.original_post.id)
      }
    });
  }

  getPosts = () => {
    return this.state.posts.map(post => {
      return <Post
      deletePost={this.deletePost}
        likedByMeInPast={!!(this.state.current_user.likes.includes(post.original_post.id))}
        cleanUpReblogs={this.cleanUpReblogs}
        rebloggedByMeInPast={!!(this.state.current_user.reblogs.includes(post.original_post.id))}
        addLike={this.addLike}
        removeLike={this.removeLike}
        addReblog={this.addReblog}
        removeReblog={this.removeReblog}
        onDashboard={false}
        key={post.id}
        post={post}
      />
    })
  }

  toggleFollow = () => {
    this.setState({
      isFollowing: !this.state.isFollowing,
      user: { ...this.state.user,
        follow_count: (this.state.isFollowing ? parseInt(this.state.user.follow_count) - 1 : parseInt(this.state.user.follow_count) + 1)
      }
    }, () => this.state.isFollowing ? Api.follow(this.state.user.username) : Api.unfollow(this.state.user.username));
  }

  followButton = () => {
    if (this.state.isFollowing) {
      return <button onClick={this.toggleFollow} onMouseOver={() => this.setState({ hover: true })} onMouseOut={() => this.setState({ hover: false })} className={this.state.hover ? "btn btn-danger" : "btn btn-dark"} id="unfollow-button">{this.state.hover ?
        <React.Fragment>
        <i className="fas fa-minus mr-2"></i>Unfollow
      </React.Fragment> :
      <React.Fragment>
        <i className="fas fa-check mr-2"></i>Following
      </React.Fragment>}
    </button>
    } else {
      return <button onMouseOver={() => this.setState({ hover: true })} onMouseOut={() => this.setState({ hover: false })} onClick={this.toggleFollow} className={this.state.hover ? "btn btn-primary" : "btn btn-dark"}><i className="fas fa-plus mr-2"></i>Follow</button>
    }
  }

  render() {
    return (this.state.isLoading ? <Spinner /> : (<div className="container-fluid">
        <div className="row pt-5 mb-5" >
          <div className="col-3 mt-5 text-center" style={{position:"fixed"}}>
            <img src={"/images/" + this.state.user.avatar} alt={this.state.user.username + "avatar"} className="border" style={{objectFit: "cover",
            width:"150px",
            height:"150px",
            borderRadius: "50%"}}
          />
          <h3>{this.state.user.username}</h3>
          <h5>Following: {this.state.user.following_count} | Followers: {this.state.user.follow_count}</h5>
          {this.followButton()}
          </div>
          <div className="col-7 offset-3">
            {this.getPosts()}
          </div>
        </div>
      </div>));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match !== this.props.match) {
      Api.getUser(this.props.match.params.username)
        .then(obj => {
          this.setState({
            current_user: obj.current_user,
            user: obj.user,
            posts: obj.posts,
            isLoading: false,
            isFollowing: !!obj.user.follower_ids.find(id => id === parseInt(JSON.parse(localStorage.user).id))
          });
        })
    }
  }

  componentDidMount() {
    Api.getUser(this.props.match.params.username)
      .then(obj => {
        this.setState({
          current_user: obj.current_user,
          user: obj.user,
          posts: obj.posts,
          isLoading: false,
          isFollowing: !!obj.user.follower_ids.find(id => id === parseInt(JSON.parse(localStorage.user).id))
        });
      })
  }

}

export default Profile;