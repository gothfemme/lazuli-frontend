import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';

class DashPostContainer extends Component {
  displayPosts = () => {
    return this.props.posts.map(post => <Post key={post.id} post={post}/>)
  }

  render() {
    return (
      <div className="col-7 offset-1">
        <div className="pt-3">
          <NewPost handleSubmit={this.props.handleSubmit}/>
          {this.displayPosts()}
        </div>
      </div>
    );
  }
}

export default DashPostContainer;