import React, { Component } from 'react';
import ProfilePost from './ProfilePost';
import Spinner from '../Components/Spinner'
import Api from '../Api';

class Profile extends Component {
  state = {
    user: {},
    isLoading: true
  }

  getPosts = () => {
    return this.state.user.posts.map(post => {
      return <ProfilePost key={post.id} post={post}/>
    })
  }

  toggleFollow = () => {

  }

  render() {
    return (this.state.isLoading ? <Spinner /> : (<div className="container-fluid">
        <div className="row pt-5 mb-5" >
          <div className="col-3 mt-5 text-center" style={{position:"fixed"}}>
            <img src={"/images/" + this.state.user.avatar} alt={this.state.user.username + "avatar"} style={{objectFit: "cover",
            width:"150px",
            height:"150px",
            borderRadius: "50%"}}
          />
          <h3>{this.state.user.username}</h3>
          <h5>Following: {this.state.user.following_count} | Followers: {this.state.user.follow_count}</h5>
          {this.state.user.follower_ids.find(id => id === parseInt(JSON.parse(localStorage.user).id)) ? <button className="btn btn-dark"><i className="fas fa-plus mr-2"></i>Unfollow</button> : <button className="btn btn-dark"><i className="fas fa-plus mr-2"></i>Follow</button>}
          </div>
          <div className="col-8 offset-3">
            {this.getPosts()}
          </div>
        </div>
      </div>));
  }

  componentDidMount() {
    Api.getUser(this.props.match.params.username)
      .then(user => {
        this.setState({
          user: user,
          isLoading: false
        });
      })
  }

}

export default Profile;