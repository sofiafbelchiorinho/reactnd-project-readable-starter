import React, { Component } from 'react';
import Comment from '../Comment'
import './Post.css';

class PostDetail extends Component {
  constructor(props) {
    super(props);    
  }

  componentDidMount() {

  }

  render() {
    const { post } = this.props;

    return (
      <div className="Comment">
       <h3>Title: {post.title}</h3>
       <div>Description: {post.body}</div>
       <div>
           <h4>Comments:</h4>
           <ul>
           {
                post.comments.map((comment) => {
                    <Comment author={comment.author} body={comment.body}/>
                })
            }
           </ul>
       </div>
       <div>Author: {post.author}</div>
      </div>
    );
  }
}

export default PostDetail;
