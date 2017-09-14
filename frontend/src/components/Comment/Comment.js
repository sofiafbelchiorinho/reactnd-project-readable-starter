import React, { Component } from 'react';
import './Comment.css';

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
       <div>{comment.author}</div>
       <div>{comment.body}</div>
      </li>
    );
  }
}

export default Comment;
