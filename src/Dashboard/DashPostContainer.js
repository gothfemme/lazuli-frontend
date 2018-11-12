import React, { Component } from 'react';
import Post from './Post';
import NewPost from './NewPost';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

class DashPostContainer extends Component {
  displayPosts = () => {
    return this.props.posts.map(post => (
      <CSSTransition
                key={post.id}
                timeout={500}
                classNames="fade"
              >
                <Post
                  onDashboard={true}
                  deletePost={this.props.deletePost}
                  addLike={this.props.addLike}
                  removeLike={this.props.removeLike}
                  isAuthor={post.original_post.author.id === this.props.user.id}
                  likedByMeInPast={!!(this.props.user.likes.includes(post.original_post.id))}
                  rebloggedByMeInPast={!!(this.props.user.reblogs.includes(post.original_post.id))}
                  removeOtherReblogs={this.props.removeOtherReblogs} cleanUpReblogs={this.props.cleanUpReblogs} addReblog={this.props.addReblog} removeReblog={this.props.removeReblog} key={post.id} post={post}
                />
              </CSSTransition>))
  }

  render() {
    return (
      <div className="col-7 offset-1">
        <div className="pt-3">
          <NewPost handleSubmit={this.props.handleSubmit}/>
          <TransitionGroup>
          {this.displayPosts()}
        </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default DashPostContainer;