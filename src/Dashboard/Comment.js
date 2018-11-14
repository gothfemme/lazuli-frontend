import React from 'react';
import { Link } from 'react-router-dom';
import timeAgo from '../Components/TimeAgo';

const Comment = (props) => (
  <li className="media px-3 py-3 border-bottom">
  <Link to={"/blog/" + props.comment.commenter.username}><img className="mr-3" src={props.comment.commenter.avatar} alt="user avatar"
  style={{objectFit: "cover",
    width:"2rem",
    height:"2rem",
    borderRadius: "50%"}}
  /></Link>
  <div className="media-body">
    <p className="mb-0" style={{fontSize:".85rem"}}><span className="mr-2" style={{fontWeight:"bold"}}><Link style={{textDecoration:"none"}} to={"/blog/" + props.comment.commenter.username}>{props.comment.commenter.username}</Link>:</span>{props.comment.content}</p>
    <p className="mb-0"><small className="text-muted mr-2">{timeAgo(props.comment.created_at)}</small><small className="font-weight-bold">{props.comment.likes.length} like{props.comment.likes.length > 1 || props.comment.likes.length === 0 ? 's' : null}</small></p>
  </div>
    <i onClick={() => props.toggleLike(props.likedByMe, props.comment.id)} className={props.likedByMe ? "fas text-danger fa-heart align-self-center ml-2 comment-like" :"far fa-heart align-self-center ml-2 comment-like"} style={{cursor:"pointer", fontSize:"1.25rem"}}></i>
</li>
);

export default Comment;