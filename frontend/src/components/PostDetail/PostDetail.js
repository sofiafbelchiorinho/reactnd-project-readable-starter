import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost } from '../../actions/postActions'
import { fetchComments } from '../../actions/commentActions'
import Comment from '../Comment/Comment'
import './PostDetail.css';

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
          <h3>Title: {post.title}</h3>
          <div>Description: {post.body}</div>
          <div>
              <h4>Comments:</h4>
              <ul>
              {
                    comments.map((comment) => {
                        <Comment author={comment.author} body={comment.body}/>
                    })
                }
              </ul>
          </div>
          <div>Author: {post.author}</div>
        </div>
      }
      </div>
    );
  }
}

function mapStateToProps ({posts, comments}) {  
    return {
      post: posts.post,
      comments
    } 
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      fetchPost: (data) => dispatch(fetchPost(data)),
      fetchComments: (data) => dispatch(fetchComments(data))
    }
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail);
