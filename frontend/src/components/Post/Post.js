import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Comment from '../Comment'
import './Post.css';

class Post extends Component {

  render() {
    const { post, category } = this.props;

    return (
      <li className="Post">
        <Link to={`/post/${post.id}`} className="Post-title">{post.title}</Link>
        <div>Description: {post.body}</div>
        <div className="Post-score">Score: {post.voteScore}</div>
        <Link to={`/category/${post.category}`} className="Post-category">{post.category}</Link>
      </li>
    );
  }
}

export default Post;
