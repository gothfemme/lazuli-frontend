import React, { Component } from 'react';

class DashSidebar extends Component {

  render() {
    return (
      <div className="col-3 offset-1 sidebar">
        <div className="pt-5">
          <button className="btn btn-light btn-lg" style={{width:"100%"}}><i className="fas fa-heart mr-3"></i>Likes</button>
          {/* <div className="card border-0 bg-light">
            <div className="card-body text-center">
            <h3 className="card-title text-muted"><i class="fas fa-heart mr-3"></i>Likes</h3>
          </div>
          </div> */}
        </div>
      </div>
    );
  }

}

export default DashSidebar;