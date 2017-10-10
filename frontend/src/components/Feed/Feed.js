import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import _ from 'lodash';
import { fetchPosts, setSortingOrder, toggleEditPost } from '../../actions/postActions'
import { setCurrentCategory } from '../../actions/categoryActions'
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
   if(!this.props.match.params.categoryId){
    this.props.setCurrentCategory(null);
   }
  }  

  sortBy = (property, order) => {
    this.props.setSortingOrder({property, order});
  }

  render() {
    const { posts, category, post, categories, editMode }  = this.props;    
    let postsToShow = category ? posts.filter(p => p.category.name === category.name && !p.deleted) : posts;

    return (
      <div className="Feed">
        <div className="Feed-list">
          <div className="Feed-actions">
            <div className="Feed-sort">
              sort by score:
              <a onClick={() => this.sortBy('voteScore', 'asc')}>asc</a>
              <a onClick={() => this.sortBy('voteScore', 'desc')}>desc</a>
            </div>  
            <div className="Feed-sort">
              sort by timestamp:
              <a onClick={() => this.sortBy('timestamp', 'asc')}>asc</a>
              <a onClick={() => this.sortBy('timestamp', 'desc')}>desc</a>
            </div>  
            <div className="Feed-sort">
              sort by title:
              <a onClick={() => this.sortBy('title', 'asc')}>asc</a>
              <a onClick={() => this.sortBy('title', 'desc')}>desc</a>
            </div>  
            <div className="Feed-add"><Link to={`/createedit/new`} onClick={() => this.props.toggleEditPost(post, false)}>add post</Link></div>        
          </div>
          <ul>              
            {            
              postsToShow.map((post, index) => {
                return <Post key={index} post={post}/>
              })          
            }
          </ul> 
        </div>
      </div>
    );
  }

  static propTypes = {
    post: PropTypes.object,
    posts: PropTypes.array.isRequired,
    editMode: PropTypes.bool,
    category: PropTypes.object,
    categories: PropTypes.array,
    sortBy: PropTypes.object
  }
}

function mapStateToProps ({posts, categories}) {

  let postsWitCategory = posts.items.map((post) => {
    return {
      ...post,
      category: categories.items.find(c => c.name === post.category)
    }
  });

  return {
    post: posts.post,
    posts: _.orderBy(postsWitCategory, [posts.sortBy.property], [posts.sortBy.order]),
    editMode: posts.editMode,
    category: categories.category,
    categories: categories.items,
    sortBy: posts.sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSortingOrder: (data) => dispatch(setSortingOrder(data)),
    fetchPosts: (data) => dispatch(fetchPosts(data)),
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data)),
    toggleEditPost: (data, editMode) => dispatch(toggleEditPost(data, editMode))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
