import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { newPost, updateFormPost, updatePost, toggleEditPost } from '../../actions/postActions'
import PropTypes from 'prop-types'
import './CreateEditPost.css';
import { Link } from 'react-router-dom';

class CreateEditPost extends Component {

  addPost = () => {
    if(!this.props.post.title || !this.props.post.category || !this.props.post.body || !this.props.post.author){
      alert('fill in all inputs');
      return;
    }     
    this.props.newPost(this.props.post);
  }

  handleInputChange(event) {
    const {name } = event.target;
    let value = event.target.value;
    if(name === "category"){
      value = this.props.categories.find(c => c.name === value);
    }

    this.props.updateFormPost({name, value});
  }

  render() {
    const { post, categories, editMode }  = this.props;    

    return (
    <div className="Feed-addPost">
      <h4>{ editMode ? 'Edit Post' : 'Add new post'}</h4>
      <label>Title:<input type="text" value={post.title} name="title" onChange={(event) => {this.handleInputChange(event)}}/></label>
      <label>Body:<input type="text" value={post.body} name="body" onChange={(event) => {this.handleInputChange(event)}}/></label>
      <label>Category: 
      <select name="category" value={post.category ? post.category : '' } disabled={editMode} onChange={(event) => {this.handleInputChange(event)}}>
          {
          categories.map((category) => {
              return <option key={category.name} value={category.name}>{category.name}</option>
          })
          }
      </select>
      </label>
      <label>Author: <input type="text" value={post.author} name="author" disabled={editMode} onChange={(event) => {this.handleInputChange(event)}}/></label>
      { !editMode && 
        <div> 
          <Link to='/' className="Feed-addPost-btn" onClick={() => this.addPost()}>add</Link>
          <Link to='/'  className="Feed-addPost-btn" onClick={() => this.props.toggleEditPost(post, false)}>cancel</Link> 
        </div>  
      }
      { editMode && 
      <div>          
        <Link to={`/post/${post.id}`} className="Feed-addPost-btn" onClick={() => this.props.updatePost(post)}>save</Link>         
        <Link to={`/post/${post.id}`}  className="Feed-addPost-btn" onClick={() => this.props.toggleEditPost(post, false)}>cancel</Link> 
      </div>
      }
    </div>  
    );
  }

  static propTypes = {
    post: PropTypes.object,
    categories: PropTypes.array,
    editMode: PropTypes.bool
  }
}

function mapStateToProps ({posts, categories}) {
  return {
    post: posts.post,  
    editMode: posts.editMode,
    categories: categories.items,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newPost: (data) => dispatch(newPost(data)),
    updateFormPost: (data) => dispatch(updateFormPost(data)),
    updatePost: (data) => dispatch(updatePost(data)),
    toggleEditPost: (data, editMode) => dispatch(toggleEditPost(data, editMode))
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateEditPost)
