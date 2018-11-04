import React, { Component } from 'react';

import DashSidebar from './DashSidebar'
import DashPostContainer from './DashPostContainer';

class Dashboard extends Component {
  state = {
    posts: [],
    hiddenScrollButton: true
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mb-5">
          <DashPostContainer />
          <DashSidebar />

        </div>
      </div>
    );
  }

}

export default Dashboard;