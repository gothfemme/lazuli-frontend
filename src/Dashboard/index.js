import React, { Component } from 'react';

import DashSidebar from './DashSidebar'
import DashPostContainer from './DashPostContainer';
import Spinner from '../Components/Spinner';
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
          user: resp.user,
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
              <DashPostContainer handleSubmit={this.handleSubmit} posts={this.state.posts} searchTerm={this.props.searchTerm} />
              <DashSidebar user={this.state.user}/>
            </React.Fragment>
        }

        </div>
      </div>
    );
  }

}

export default Dashboard;