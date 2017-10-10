import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { votePost, toggleEditPost } from '../../actions/postActions'
import { setCurrentCategory } from '../../actions/categoryActions'
import { fetchComments } from '../../actions/commentActions'
import _ from 'lodash';
import './Post.css';

class Post extends Component {

  
  componentWillMount() {
    this.props.fetchComments(this.props.post.id)
      .then(response => {
        console.log(response);
      });
  }  
  

  setCategory = (category) => {
    this.props.setCurrentCategory(category)
  }

  setDate = (timestamp) => {
    return (new Date(timestamp)).getDate() + '/' +((new Date(timestamp)).getMonth()+1) +  '/' + (new Date(timestamp)).getFullYear();
  }

  render() {
    const { post, comments = null, category, editMode } = this.props;

    return (
      <li className="Post">       
        <div className="Post-left">
          <Link to={`/post/${post.id}`} className="Post-title">{post.title}</Link>
          <div>{post.body}</div>
          <div>by <span className="Post-author">{post.author}</span> on {this.setDate(post.timestamp)}</div>
          <div>comments: {comments.length}</div>
        </div>
        <div className="Post-score">      
          <Link to='/' onClick={(e) => {e.preventDefault(); this.props.votePost(post.id, 'upVote');}}>vote up</Link>
          <span>[ score: {post.voteScore} ]</span> 
          <Link to='/' onClick={(e) => {e.preventDefault(); this.props.votePost(post.id, 'downVote');}}>vote down</Link>                 
        </div>
        <Link className="Post-category" to={`/category/${post.category.path}`}  onClick={() => this.setCategory(post.category)}>{post.category.name}</Link>
      </li>
    );
  }
}

function mapStateToProps ({posts, comments}) {
  
   return {
    editMode: posts.editMode,
    comments: comments.items
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data)),
    votePost: (data, option) => dispatch(votePost(data, option)),
    toggleEditPost: (data, editMode) => dispatch(toggleEditPost(data, editMode)),
    fetchComments: (data) => dispatch(fetchComments(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
  
