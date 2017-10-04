import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createPost } from '../../actions/postActions'
import { Route } from 'react-router-dom'
import logo from '../../logo.svg';
import Feed from '../Feed/Feed'
import Sidebar from '../Sidebar/Sidebar'
import PostDetail from '../PostDetail/PostDetail';
import CreateEditPost from '../CreateEditPost/CreateEditPost';
import CreateEditComment from '../CreateEditComment/CreateEditComment';
import { api, GET } from '../../config'
import './App.css';

class App extends Component {
  
  render() {
    const { posts, categories, currentCategory } = this.props

    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="App-content">
            <Sidebar/>
            <div className="App-main">
              <Route exact path='/' component={Feed} />  
              <Route path='/category/:categoryId' component={Feed}/>    
              <Route path='/post/:postId' component={PostDetail} />  
              <Route path='/createedit/:postId' component={CreateEditPost} />  
              <Route path='/comment/:commentId' component={CreateEditComment} /> 
            </div>      
          </div>   
        </div>
      </BrowserRouter>
    );
  }
}

export default App
