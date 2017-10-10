import React, { Component } from 'react';
import { connect } from 'react-redux'
import { votePost, toggleEditPost, fetchPost, removePost } from '../../actions/postActions'
import { toggleEditComment, fetchComments } from '../../actions/commentActions'
import Comment from '../Comment/Comment'
import './PostDetail.css';
import { Link } from 'react-router-dom';

class PostDetail extends Component {

  componentWillMount() {
    if(this.props.match && this.props.match.params){
      let id = this.props.match.params.postId;
      
      this.props.fetchPost(id)
        .then(response => { 
          console.log(response); 
        });
        
      this.props.fetchComments(id)
        .then(response => {
          console.log(response);
        });
    }  
  }

  render() {
    const { post = null, comments } = this.props;

    return (
      <div className="PostDetail">
      {
        post && 
        <div>
          <div className="Post-header">
            <h1>{post.title}</h1>
            
          </div>  
          <div className="Post-body">Description: {post.body}</div>   
          <div><span className="Post-author">by {post.author}</span></div>  
          <div className="Post-actions">
              <Link className="PostDetail-editBtn" to={`/comment/new`} onClick={() => this.props.toggleEditComment(post, false)}>comment</Link>
              <Link className="PostDetail-editBtn" to={`/createedit/${post.id}`} onClick={() => this.props.toggleEditPost(post, true)}>edit</Link>
              <Link className="PostDetail-editBtn" to="/" onClick={() => this.props.removePost(post)}>delete</Link>
              <Link className="PostDetail-editBtn" to='/' onClick={(e) => {e.preventDefault(); this.props.votePost(post.id, 'upVote');}}>vote up</Link>
              <span className="PostDetail-editBtn">[ score: {post.voteScore} ]</span> 
              <Link className="PostDetail-editBtn" to='/' onClick={(e) => {e.preventDefault(); this.props.votePost(post.id, 'downVote');}}>vote down</Link> 
            </div>   
          <div className="PostDetail-comments">
              <h4>Comments ({comments.length}):</h4>
              <ul>
              {
                    comments.map((c) => {
                        return <Comment key={c.id} comment={c}/>
                    })
                }
              </ul>
          </div>     
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps ({posts, comments}) {  
    return {
      post: posts.post,
      comments: comments.items
    } 
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      fetchPost: (data) => dispatch(fetchPost(data)),
      fetchComments: (data) => dispatch(fetchComments(data)),
      votePost: (data, option) => dispatch(votePost(data, option)),
      removePost: (data) => dispatch(removePost(data)),
      toggleEditPost: (data, editMode) => dispatch(toggleEditPost(data, editMode)),
      toggleEditComment: (data, editMode) => dispatch(toggleEditComment(data, editMode))
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
