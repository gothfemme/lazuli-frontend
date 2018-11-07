import React, { Component } from 'react';
import UserSearchResult from './UserSearchResult';

class DashSidebar extends Component {

  render() {
    return (
      <div className="col-3 offset-1 sidebar border-left px-0">
        <div className="border-bottom">
          <div className="row px-3">
            <div className="text-center col border-right py-3" style={{marginBottom:"0"}}><p className="mb-0">Following</p><h4 className="mb-0">100</h4></div>
            <div className="text-center col border-right py-3" style={{marginBottom:"0"}}><p className="mb-0">Followers</p><h4 className="mb-0">420</h4></div>
            {/* <h5 style={{margin:"auto"}}>Following: Number Here</h5> */}
          </div>
        </div>
        <div className="border-bottom px-3 py-3 text-center">
          <h5 className="my-auto"><i className="fas fa-heart pr-3"></i>Liked posts</h5>
        </div>
        <div className="">
          <div className="px-3 py-3" id="user-search">
            <label htmlFor="find-user">Find Users</label>
            <div class="input-group mb-2">
            <input className="form-control" id="find-user" placeholder="Search by username..."></input>
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" id="button-addon2"><i class="fas fa-users"></i></button>
            </div>

          </div>

          </div>
          <div id="user-search-results">
            <ul class="list-group list-group-flush border-top">
              <UserSearchResult />
              <UserSearchResult />
              <UserSearchResult />
              <UserSearchResult />
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default DashSidebar;