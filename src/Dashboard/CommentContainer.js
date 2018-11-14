import React, { Component } from 'react';
import Api from '../Api';
import Comment from './Comment';
import TinySpinner from '../Components/TinySpinner';
import validator from 'validator';

class CommentContainer extends Component {
  state = {
    comments: [],
    isLoading: true,
    commentField: '',
    error: false
  }

  showComments = () => {
    return this.state.comments.map(comment => (
      <Comment toggleLike={this.toggleLike} likedByMe={comment.likes.includes(this.props.currentUser.id)} key={comment.id} comment={comment} />))
  }

  componentDidMount() {
    Api.getComments(this.props.post.id)
      .then(comments => {
        this.setState({
          isLoading: false,
          comments: comments
        });
      })
  }

  handleChange = e => {
    this.setState({
      commentField: e.target.value
    }, this.validateComment);
  }

  validateComment = () => {
    if (!validator.isLength(this.state.commentField, { min: 1, max: 140 })) {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        error: false
      });
    }
  }

  toggleLike = (isLikedAlready, id) => {
    if (isLikedAlready) {
      this.setState({
        comments: this.state.comments.map(comment => comment.id !== id ? comment : { ...comment,
          likes: comment.likes.filter(id => id !== this.props.currentUser.id)
        })
      });
      Api.commentUnlike(this.props.post.id, id)
    } else {
      this.setState({
        comments: this.state.comments.map(comment => comment.id !== id ? comment : { ...comment, likes: [...comment.likes, this.props.currentUser.id] })
      });
      Api.commentLike(this.props.post.id, id)
    }
  }

  createComment = e => {
    e.preventDefault()
    const data = {
      post_id: this.props.post.id,
      content: this.state.commentField
    }
    Api.createComment(data)
      .then(comment =>
        this.setState({
          comments: [...this.state.comments, comment],
          commentField: ''
        }))
  }

  render() {
    return (
      <div>
          <ul className="card-body border-top mb-0 list-group px-0 py-0 list-group-flush">
            {this.state.isLoading ? <TinySpinner /> : this.showComments()}
          </ul>
          <form className="card-body"
            onSubmit = {this.createComment}>
          <div className="input-group">
            <input onChange={this.handleChange} value={this.state.commentField} className={`form-control ${this.state.error ? 'is-invalid' : ''}`} placeholder="Leave a comment..."></input>
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit" id="button-addon2" disabled={this.state.error || this.state.commentField === ''}><i className="fas fa-comment" ></i></button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default CommentContainer;