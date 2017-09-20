import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createPost, fetchPosts } from '../../actions/postActions'
import PropTypes from 'prop-types'
import Post from '../Post/Post'
import './Feed.css';

class Feed extends Component {

  state = {
    category: null  
  } 

  componentWillMount() {
    if(this.props.match && this.props.match.params){
     this.setState({category: this.props.match.params.categoryId})
    }
   if(this.props.posts.length == 0){
    this.props.fetchPosts()
    .then(response => {
      console.log(response);
    });
   }
  }  

  render() {
    const { posts }  = this.props;
    const { category } = this.state;
    
    let postsToShow = category ? posts.filter(c => c.category == category) : posts;

    return (
      <div className="Feed">
        { category ? <h3>{category}</h3> : <h3>Your feed</h3>  }
        <ul>              
          {
            postsToShow.map( post => {
              console.log(post);
              return <Post key={post.id} post={post}/>
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

function mapStateToProps ({posts, comments = []}) {

  return {
    posts: posts.items,
    comments
  }

   /*let cat = [{name: 'react', path: 'react'}, {name: 'redux', path: 'redux'} ];
  return {
    posts: cat.map((category) => {
      return Object.keys(posts[category.name]).reduce((accumulator, index) => {
        accumulator = posts[category.name][index]
          ? {...posts[category.name][index], category}
          : null;
        return accumulator;
      }, [])
    })   
  }*/

}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data) => dispatch(fetchPosts(data)),
    createPost: (data) => dispatch(createPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
