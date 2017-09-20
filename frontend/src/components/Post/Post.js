import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { votePost } from '../../actions/postActions'
import './Post.css';

class Post extends Component {

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
        </div>
        <Link to={`/category/${post.category}`} className="Post-category">{post.category}</Link>
      </li>
    );
  }
}

function mapStateToProps ({posts}) {
  
    return {
      posts: posts.items
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      votePost: (data, option) => dispatch(votePost(data, option))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
  
