import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Comment.css';
import { Link } from 'react-router-dom';
import { toggleEditComment, removeComment, voteComment } from '../../actions/commentActions'
import PropTypes from 'prop-types'

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
       <span className="Comment-score">[ score: {comment.voteScore} ]</span> 
       <div className="Comment-actions">
        <Link className="Comment-editBtn" to='/' onClick={(e) => {e.preventDefault(); this.props.voteComment(comment.id, 'upVote');}}>vote up</Link>
        <Link className="Comment-editBtn" to='/' onClick={(e) => {e.preventDefault(); this.props.voteComment(comment.id, 'downVote');}}>vote down</Link>
        <Link className="Comment-editBtn" to={`/comment/${comment.id}`} onClick={() => this.props.toggleEditComment(comment, true)}>edit</Link>
        <Link className="Comment-editBtn" to={`/post/${comment.parentId}`} onClick={() => this.props.removeComment(comment)}>delete</Link> 
       </div>
      </li>
    );
  }

  static propTypes = {
    post: PropTypes.object,
    editMode: PropTypes.bool
  }
}

function mapStateToProps ({posts, comments}) {
  return {
    post: posts.post,
    editMode: comments.editMode
  }
}

function mapDispatchToProps (dispatch) {
  return {
    removeComment: (data) => dispatch(removeComment(data)),
    voteComment: (data, option) => dispatch(voteComment(data, option)),
    toggleEditComment: (data, editMode) => dispatch(toggleEditComment(data, editMode))
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)

