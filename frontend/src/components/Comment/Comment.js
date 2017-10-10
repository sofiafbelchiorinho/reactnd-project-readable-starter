import React, { Component } from 'react';
import './Comment.css';
import { Link } from 'react-router-dom';

class Comment extends Component {
  constructor(props) {
    super(props);    
  }

  componentDidMount() {

  }

  render() {
    const { comment } = this.props;

    return (
      <li className="Comment">
       <div className="Comment-body">{comment.body}</div>
       <div className="Comment-author">by {comment.author}</div>
       <Link className="Comment-editBtn" to={`/comment/${comment.id}`}>edit</Link>
      </li>
    );
  }
}

export default Comment;
