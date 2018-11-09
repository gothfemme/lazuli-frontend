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
        console.log(resp)
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
      posts: [post, ...this.state.posts]
    });
  }

  cleanUpReblogs = (post) => {
    this.setState({
      posts: this.state.posts.map(currentPost => {
        if (currentPost.original_post === post.original_post) {
          return currentPost.original_post.reblogs.filter(x => x !== this.state.user.id)
        } else {
          return currentPost
        }
      })
    });
  }

  removeReblog = post => {
    this.setState({
      posts: this.state.posts.filter(dashPost => dashPost !== post)
    }, () => this.cleanUpReblogs(post));
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
                          <CSSTransition timeout={1000} classNames="fade"><DashPostContainer cleanUpReblogs={this.cleanUpReblogs} addReblog={this.addReblog} removeReblog={this.removeReblog} handleSubmit={this.handleSubmit} posts={this.state.posts} searchTerm={this.props.searchTerm} /></CSSTransition>
              <DashSidebar user={this.state.user}/>
            </React.Fragment>
        }

        </div>
      </div>
    );
  }

}

export default Dashboard;