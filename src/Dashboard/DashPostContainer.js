import React, { Component } from 'react';
import Api from '../Api'
import Post from './Post';
import NewPost from './NewPost';
import Spinner from '../Components/Spinner';

class DashPostContainer extends Component {
  state = {
    isLoading: true,
    posts: []
  }

  displayPosts = () => {
    return this.state.posts.map(post => <Post post={post}/>)
  }

  handleSubmit = (data) => {
    console.log(data)
    Api.createPost(data)
      .then(post => this.setState({
        posts: [post, ...this.state.posts]
      }))
  }

  render() {
    return (
      <div className="col-8">
        <div className="pt-3">
          <NewPost handleSubmit={this.handleSubmit}/>
          {this.state.isLoading ? <Spinner /> : this.displayPosts()}
        </div>
      </div>
    );
  }

  componentDidMount() {
    Api.getPosts()
      .then(posts => {
        this.setState({
          isLoading: false,
          posts: posts
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
        return undefined
      })
  }

}

export default DashPostContainer;