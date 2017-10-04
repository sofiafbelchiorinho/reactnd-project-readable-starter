import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { newComment, updateComment, toggleEditComment } from '../../actions/commentActions'
import PropTypes from 'prop-types'
import './CreateEditComment.css';
import { Link } from 'react-router-dom';

class CreateEditComment extends Component {

  addComment = () => {
    if(!this.props.comment.body || !this.props.comment.author){
      alert('fill in all inputs');
      return;
    }     
    this.props.newComment(this.props.comment);
  }

  render() {
    const { comment, comments, editMode }  = this.props;    

    return (
    <div className="Feed-addComment">
      <h4>{ editMode ? 'Edit Comment' : 'Add new comment'}</h4>
      <label>Body:<input type="text" value={comment.body} name="body"/></label>
      <label>Author: <input type="text" value={comment.author} name="author" disabled={editMode}/></label>
      { !editMode && <Link to="/" className="Feed-addComment-btn" onClick={() => this.addComment()}>add</Link> }
      { editMode && 
      <div>
          <Link to="/" className="Feed-addComment-btn" onClick={() => this.props.updateComment(comment)}>save</Link>
          <Link to="/"  className="Feed-addComment-btn" onClick={() => this.props.toggleEditcomment(comment, false)}>cancel</Link> 
      </div>
      }
    </div>  
    );
  }
}

function mapStateToProps ({posts, comments}) {
  return {
    comment: comments.comment,  
    editMode: comments.editMode
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newComment: (data) => dispatch(newComment(data)),
    updateComment: (data) => dispatch(updateComment(data)),
    toggleEditComment: (data, editMode) => dispatch(toggleEditComment(data, editMode))
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateEditComment)
