import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createPost } from '../../actions/postActions'
import { Route } from 'react-router-dom'
import logo from '../../logo.svg';
import Feed from '../Feed/Feed'
import PostDetail from '../PostDetail/PostDetail';
import { api, GET } from '../../config'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: 'backend-data'
    }
  }

  componentDidMount(){
    fetch(`${api}/categories`, GET)
      .then( (res) => { 
        return(res.text()) 
      })
      .then((data) => {
        this.setState({categories: data})
      });
  }

  render() {
    const { posts } = this.props

    return (
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="App-content">
            <Route exact path='/' component={Feed} />  
            <Route path='/category/:categoryId' component={Feed} />    
            <Route path='/post/:postId' component={PostDetail} />        
          </div>   
        </div>
      </BrowserRouter>
    );
  }
}


export default App;