import React, { Component } from 'react';
import UserSearchResult from './UserSearchResult';
import Api from '../Api';

class DashSidebar extends Component {
  state = {
    searchTerm: "",
    isSearching: false,
    userSearchResults: []
  }

  handleSubmit = e => {
    e.preventDefault()
    Api.searchUsers(this.state.searchTerm)
      .then(users => {
        this.setState({
          isSearching: true,
          userSearchResults: users
        });
      })
  }

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  getUserList = () => {
    return this.state.userSearchResults.map(user => <UserSearchResult follow={this.props.follow} unfollow={this.props.unfollow} key={user.id} current_user={this.props.user} user={user} />)
  }

  noUsersFound = () => {
    return (
      <div className="border-top" style={{height:"100%", margin:"auto", textAlign:"center"}}>
      <h4 style={{marginTop:"25vh"}}>No results found.</h4>
      </div>
    )
  }

  render() {
      let noResults = !!(!this.state.userSearchResults.length && this.state.isSearching)
      return (
          <div className="col-3 offset-1 sidebar border-left px-0">
        <div className="border-bottom">
          <div className="row px-3">
            <div className="text-center col border-right py-3" style={{marginBottom:"0"}}><p className="mb-0">Following</p><h4 className="mb-0">{this.props.user.following_count}</h4></div>
            <div className="text-center col border-right py-3" style={{marginBottom:"0"}}><p className="mb-0">Followers</p><h4 className="mb-0">{this.props.user.follow_count}</h4></div>
          </div>
        </div>
        {/* // <div className="border-bottom px-3 py-3 text-center">
        //   <h5 className="my-auto"><i className="fas fa-heart pr-3"></i>Liked posts</h5>
        // </div> */}
        <div>
          <form onSubmit={this.handleSubmit} className="px-3 py-3" id="user-search">
            <label htmlFor="find-user">Find Users</label>
            <div className="input-group mb-2">
            <input className="form-control" id="find-user" onChange={this.handleChange} placeholder="Search by username..." style={{paddingRight:"1.5rem"}} value={this.state.searchTerm} autoComplete="off" ></input>
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit" id="button-addon2"><i className="fas fa-users"></i></button>
            </div>
          </div>
          {this.state.isSearching && <i onClick={() => this.setState({
            isSearching: false,
            searchTerm: "",
            userSearchResults: []
          })} className="fas fa-times-circle" style={{ position: "relative",
            margin: "0",
            zIndex: "1000",
            opacity: ".7",
            float:"right",
            left: "-3.5rem",
            cursor:"pointer",
            top: "-2.2rem"}}></i>}

        </form>
          <div id="user-search-results" className="border-bottom" style={{height:"50vh"}}>

              {noResults ? this.noUsersFound() : (<ul className="list-unstyled border-top" style={{overflow:"auto", height:"100%", paddingBottom:"5rem"}}>{this.getUserList()}</ul>)}

          </div>
        </div> <
      /div>
    );
  }

}

export default DashSidebar;