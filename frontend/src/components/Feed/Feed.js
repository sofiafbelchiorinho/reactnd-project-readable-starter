import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { newPost, fetchPosts, setSortingOrder, updateFormPost } from '../../actions/postActions'
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

  addPost = () => {
    if(!this.props.post.title || !this.props.post.category || !this.props.post.body || !this.props.post.author){
      alert('fill in all inputs');
      return;
    }     
    console.log(this.props.post)
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

  sortBy = (property, order) => {
    this.props.setSortingOrder({property, order});
  }

  render() {
    const { posts, category, post, categories }  = this.props;    
    let postsToShow = category ? posts.filter(c => c.category.name === category.name) : posts;

    return (
      <div className="Feed">
        <div className="Feed-list">
          <div className="Feed-actions">
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
            <div></div>        
          </div>
          <ul>              
            {            
              postsToShow.map((post, index) => {
                return <Post key={index} post={post}/>
              })          
            }
          </ul> 
        </div>
        <div className="Feed-addPost">
          <label>Title:<input type="text" value={this.props.post.title} name="title" onChange={(event) => {this.handleInputChange(event)}}/></label>
          <label>Body:<input type="text" value={this.props.post.body} name="body" onChange={(event) => {this.handleInputChange(event)}}/></label>
          <label>Category: 
            <select name="category" value={this.props.post.category ? this.props.post.category : '' } onChange={(event) => {this.handleInputChange(event)}}>
              {
                this.props.categories.map((category) => {
                  return <option key={category.name} value={category.name}>{category.name}</option>
                })
              }
            </select>
          </label>
          <label>Author: <input type="text" value={this.props.post.author} name="author" onChange={(event) => {this.handleInputChange(event)}}/></label>
          <button className="Feed-addPost-btn" onClick={() => this.addPost()}>add post</button>
        </div>
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
      category: categories.items.find(c => c.name === post.category)
    }
  });

  return {
    post: posts.post,
    posts: _.orderBy(postsWitCategory, [posts.sortBy.property], [posts.sortBy.order]),
    category: categories.category,
    categories: categories.items,
    sortBy: posts.sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSortingOrder: (data) => dispatch(setSortingOrder(data)),
    fetchPosts: (data) => dispatch(fetchPosts(data)),
    newPost: (data) => dispatch(newPost(data)),
    updateFormPost: (data) => dispatch(updateFormPost(data)),
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
