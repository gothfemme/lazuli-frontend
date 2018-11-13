import React from 'react';
import timeAgo from '../Components/TimeAgo';
import { Link } from 'react-router-dom';

const Notification = (props) => {
  const notification = props.notification.notifiable
  const actionText = (notification.type === "commented") ? `${notification.type} on your post` : `${notification.type} your post`
  return (
    <li className="media px-3 py-3 border-top">
  <Link to={"/blog/" + notification.notifier.username}><img className="mr-3" src={"/images/" + notification.notifier.avatar} alt="user avatar"
  style={{objectFit: "cover",
    width:"2rem",
    height:"2rem",
    borderRadius: "50%"}}
  /></Link>
  <div className="media-body">
    <p className="mb-0" style={{fontSize:".85rem"}}><span className="mr-1" style={{fontWeight:"bold"}}><Link style={{textDecoration:"none"}} to={"/blog/" + notification.notifier.username}>{notification.notifier.username}</Link></span>{actionText + ''}</p>
    <p className="mb-0"><small className="text-muted mr-2">{timeAgo(props.notification.created_at)}</small></p>
  </div>
  {props.isNew ? <i className="bg-danger fas fa-circle"></i> : null}
</li>
  )
};

export default Notification;