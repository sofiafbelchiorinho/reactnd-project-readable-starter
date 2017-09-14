import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createEditPost, votePost, deletePost } from '../../actions'
import { Route } from 'react-router-dom'
import logo from '../../logo.svg';
import Post from '../Post/Post'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'backend-data'
    }
  }

  componentDidMount(){
    const url = `http://localhost:3001/categories`; //
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { 
        return(res.text()) 
      })
      .then((data) => {
        data = JSON.parse(data);
        //this.setState({data}); 
        
        //TODO
      });
  }

  render() {
    const { categories } = this.props

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p>
          Talking to the backend yields these categories: <br/>
          {this.state.data}
        </p>
        <div className="App-content">
          <Route exact path='/' render={() => (            
            categories.map( category => 
              <ul key={category.name}>              
                {
                  category.posts.map( post => {
                    console.log(post);
                    return <Post key={post.id} post={post} category={category.name}/>
                  })
                }
              </ul>      
            )          
          )}/>  
          <Route path='/categories' render={() => (
           // <List posts={posts} category={category}/>
            <p>hello world! categories page</p>
          )}/>         
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ categories }) {

  let cat = this.data !== undefined ? this.data.categories : ['react', 'redux']

  //TODO: HANDLE CATEGORIES WITHOUT POSTS

  return {
    categories: cat.map((category) => ({
      name: category,
      posts: Object.keys(categories[category]).reduce((posts, post) => {
        posts[post] = categories[category][post]
         ? categories[category][post]
         : null;
        return posts;
      }, [])
    }))
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createEdit: (data) => dispatch(createEditPost(data)),
    vote: (data) => dispatch(votePost(data)),
    remove: (data) => dispatch(deletePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)