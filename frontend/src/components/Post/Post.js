import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { votePost } from '../../actions/postActions'
import { setCurrentCategory } from '../../actions/categoryActions'
import _ from 'lodash';
import './Post.css';

class Post extends Component {

  setCategory = (category) => {
    this.props.setCurrentCategory(category)
  }

  setDate = (timestamp) => {
    return (new Date(timestamp)).getDate() + '/' +((new Date(timestamp)).getMonth()+1) +  '/' + (new Date(timestamp)).getFullYear();
  }

  render() {
    const { post, category } = this.props;

    return (
      <li className="Post">
        <div className="Post-score">
          <a className="Post-vote" onClick={() => this.props.votePost(this.props.post.id, 'upVote')}>+</a>
          <span>{post.voteScore}</span>
          <a className="Post-vote" onClick={() => this.props.votePost(this.props.post.id,'downVote')}>-</a>
        </div>
        <div>
          <Link to={`/post/${post.id}`} className="Post-title">{post.title}</Link>
          <div>{post.body}</div>
          <div>{post.author}</div>
          <div>{this.setDate(post.timestamp)}</div>
        </div>
        <Link className="Post-category" to={`/category/${post.category.path}`}  onClick={() => this.setCategory(post.category)}>
          {post.category.name}
        </Link>
      </li>
    );
  }
}

function mapStateToProps ({comments}) {
  
   return {
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data)),
    votePost: (data, option) => dispatch(votePost(data, option))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
  
