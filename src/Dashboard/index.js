import React, { Component } from 'react';

import DashSidebar from './DashSidebar'
import DashPostContainer from './DashPostContainer';
import Spinner from '../Components/Spinner';
import { CSSTransition } from 'react-transition-group';
import Api from '../Api';

class Dashboard extends Component {
  state = {
    isLoading: true,
    user: null,
    posts: []
  }

  fetchDash() {
    Api.getPosts()
      .then(resp => {
        this.setState({
          isLoading: false,
          user: resp.current_user,
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

  handleSubmit = (data) => {
    Api.createPost(data)
      .then(post => this.setState({
        posts: [post, ...this.state.posts]
      }))
  }

  deletePost = post => {
    this.setState({
      posts: this.state.posts.filter(dashPost => dashPost.original_post.id !== post.original_post.id)
    })
    Api.deletePost(post.original_post.id)
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

  addReblog = post => {
    this.setState({
      user: { ...this.state.user, reblogs: [post.original_post.id, ...this.state.user.reblogs] },
      posts: [post, ...this.state.posts]
    });
  }

  cleanUpReblogs = (post) => {
    this.setState({
      user: { ...this.state.user,
        reblogs: this.state.user.reblogs.filter(post_id => post_id !== post.original_post.id)
      }
    });
    return true
  }

  addLike = post => {
    this.setState({
      user: { ...this.state.user, likes: [post.original_post.id, ...this.state.user.likes] }
    });
  }

  removeLike = (post) => {
    this.setState({
      user: { ...this.state.user,
        likes: this.state.user.likes.filter(post_id => post_id !== post.original_post.id)
      }
    });
  }

  removeOtherReblogs = (post) => {
    this.setState({
      posts: this.state.posts.filter(dashPost => !(dashPost.is_reblog && dashPost.user.id === this.state.user.id && dashPost.original_post.id === post.original_post.id))
    });
    return true
  }

  removeReblog = post => {
    this.setState({
      posts: this.state.posts.filter(dashPost => dashPost !== post)
    }, () => this.cleanUpReblogs(post));
  }

  follow = user => {
    this.setState({
      user: { ...this.state.user,
        following_ids: [...this.state.user.following_ids, user.id]
      }
    });
    Api.follow(user.username)
  }

  unfollow = user => {
    this.setState({
      user: { ...this.state.user,
        following_ids: this.state.user.following_ids.filter(id => id !== user.id)
      }
    });
    Api.unfollow(user.username)
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

  componentDidMount() {
    this.fetchDash()
  }

  render() {
    return (
      <div className="container-fluid pt-3">
        <div className="row mb-5">
          {this.state.isLoading ? <Spinner /> :
            <React.Fragment>
                          <CSSTransition timeout={1000} classNames="fade">
                            <DashPostContainer
                              deletePost={this.deletePost}
                              addLike={this.addLike} removeLike={this.removeLike} removeOtherReblogs={this.removeOtherReblogs} user={this.state.user} cleanUpReblogs={this.cleanUpReblogs} addReblog={this.addReblog} removeReblog={this.removeReblog} handleSubmit={this.handleSubmit} posts={this.state.posts} searchTerm={this.props.searchTerm} /></CSSTransition>
              <DashSidebar user={this.state.user} follow={this.follow} unfollow={this.unfollow}/>
            </React.Fragment>
        }

        </div>
      </div>
    );
  }

}

export default Dashboard;