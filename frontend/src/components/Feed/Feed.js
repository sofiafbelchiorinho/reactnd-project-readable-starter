import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { createPost, fetchPosts, setSortingOrder } from '../../actions/postActions'
import PropTypes from 'prop-types'
import Post from '../Post/Post'
import './Feed.css';

class Feed extends Component {

  componentWillMount() {
    if(this.props.posts.length == 0){
      this.props.fetchPosts()
      .then(response => {
        console.log(response);
      });
   }
  }  

  sortBy = (property, order) => {
    this.props.setSortingOrder({property, order});
  }

  render() {
    const { posts, category }  = this.props;    
    let postsToShow = category ? posts.filter(c => c.category.name == category.name) : posts;

    return (
      <div className="Feed">
        <div className="Feed-sorting-area">
          <div className="Feed-sort">
            sort by score
            <a onClick={() => this.sortBy('voteScore', 'asc')}>asc</a>
            <a onClick={() => this.sortBy('voteScore', 'desc')}>desc</a>
          </div>  
          <div className="Feed-sort">
            sort by timestamp
            <a onClick={() => this.sortBy('timestamp', 'asc')}>asc</a>
            <a onClick={() => this.sortBy('timestamp', 'desc')}>desc</a>
          </div>  
          <div className="Feed-sort">
            sort by title
            <a onClick={() => this.sortBy('title', 'asc')}>asc</a>
            <a onClick={() => this.sortBy('title', 'desc')}>desc</a>
          </div>          
        </div>
        <ul className="Feed-list">              
          {            
            postsToShow.map((post, index) => {
              return <Post key={index} post={post}/>
            })          
          }
        </ul> 
      </div>
    );
  }

  static propTypes = {
    posts: PropTypes.array.isRequired
  }
}

function mapStateToProps ({posts, categories}) {

  let postsWitCategory = posts.items.map((post) => {
    return {
      ...post,
      category: categories.items.find(c => c.name == post.category)
    }
  });

  return {
    posts: _.orderBy(postsWitCategory, [posts.sortBy.property], [posts.sortBy.order]),
    category: categories.category,
    sortBy: posts.sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSortingOrder: (data) => dispatch(setSortingOrder(data)),
    fetchPosts: (data) => dispatch(fetchPosts(data)),
    createPost: (data) => dispatch(createPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
