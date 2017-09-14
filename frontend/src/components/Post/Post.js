import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Comment from '../Comment'
import './Post.css';

class Post extends Component {

  render() {
    const { post, category } = this.props;

    return (
      <div className="Post">
       <h3>Title: {post.title}</h3>
       <div>Description: {post.body}</div>
       <div className="Post-score">Score: {post.voteScore}</div>
       <Link to="/category" className="Post-category">{category}</Link>
      </div>
    );
  }
}

export default Post;
