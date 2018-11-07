import React, { Component } from 'react';

import DashSidebar from './DashSidebar'
import DashPostContainer from './DashPostContainer';

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid pt-3">
        <div className="row mb-5">
          <DashPostContainer searchTerm={this.props.searchTerm} />
          <DashSidebar />

        </div>
      </div>
    );
  }

}

export default Dashboard;