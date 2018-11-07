import React from 'react';

const UserSearchResult = (props) => (
  <li className="media px-3 py-2 border-bottom">
    <img src={"/images/default_user.jpeg"} className="border align-self-center mr-3" style={{objectFit: "cover",
      width:"2rem",
      height:"2rem",
      borderRadius: "50%"}}
    />
    <div className="media-body">
      <h5 className="mt-0 mb-0">Username</h5>
      <small className="text-muted">User bio...</small>
    </div>
    <i className="fas fa-user-plus ml-3 align-self-center"></i>
  </li>
);

export default UserSearchResult;