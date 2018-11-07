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
    return this.state.posts.map(post => <Post key={post.id} post={post}/>)
  }

  handleSubmit = (data) => {
    Api.createPost(data)
      .then(post => this.setState({
        posts: [post, ...this.state.posts]
      }))
  }

  render() {
    return (
      <div className="col-7 offset-1">
        <div className="pt-3">
          <NewPost handleSubmit={this.handleSubmit}/>
          {this.state.isLoading ? <Spinner /> : this.displayPosts()}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchDash()
  }

  fetchDash() {
    Api.getPosts()
      .then(resp => {
        console.log(resp)
        this.setState({
          isLoading: false,
          posts: resp.posts
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
        return undefined
      })
  }

  searchSite() {
    Api.searchSite(this.props.searchTerm)
      .then(resp => {
        this.setState({
          isLoading: false,
          posts: resp.posts
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
        return undefined
      })
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        isLoading: true
      }, () => {
        this.props.searchTerm ? this.searchSite() : this.fetchDash()
      });
    }
  }

}

export default DashPostContainer;