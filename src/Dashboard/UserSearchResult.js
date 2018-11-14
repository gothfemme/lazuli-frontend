import React from 'react';
import { Link } from 'react-router-dom';

const UserSearchResult = (props) => {
  let doesFollow = !!props.current_user.following_ids.includes(props.user.id)
  return (
    <li className="media px-3 py-2 border-bottom">
    <Link to={"blog/" + props.user.username}><img src={props.user.avatar} className="border align-self-center mr-3" style={{objectFit: "cover",
      width:"3rem",
      height:"3rem",
      borderRadius: "50%"}}
    /></Link>
    <div className="media-body">
      <Link style={{color:"inherit", textDecoration:"none"}} to={"blog/" + props.user.username}><h5 className="mt-0 mb-0">{props.user.username}</h5></Link>
      <small className="text-muted">{props.user.bio}</small>
    </div>
    {doesFollow ? <i onClick={() => props.unfollow(props.user)} className="fas fa-user-times ml-3 align-self-center" style={{cursor:"pointer"}} ></i> : <i onClick={() => props.follow(props.user)} className="fas fa-user-plus ml-3 align-self-center" style={{cursor:"pointer"}} ></i>}
  </li>
  )
};

export default UserSearchResult;