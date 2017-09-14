import { combineReducers } from 'redux'

import {
  CREATE_EDIT_POST, VOTE_POST, DELETE_POST, //post actions
  ADD_EDIT_COMMENT, VOTE_COMMENT, DELETE_COMMENT //comment actions
} from '../actions'


//POSTS

const initialPostsState = {
  react: [
    {
      id: 0,
      title: 'Create pages with Salesforce Lightning',
      body: 'Learn how to create amazing user experience with Lightning and become an expert in this new technology',
      voteScore: 10
    }    
  ],
  redux: [
    {
      id: 1,
      title: 'Udacity presents its latest course - Angular 2',
      body: 'Learn how to create amazing user experience with Angular 2',
      voteScore: 1
    }
  ]
}

function categories (state = initialPostsState, action) {
  //const { post, comment, category, vote } = action
  const { post, category } = action

  switch (action.type) {
    case CREATE_EDIT_POST :
      return {
        ...state,
        [category] : {
          ...state,
          post          
        }
      }
    case VOTE_POST :
      return {
        ...state,
        [post.category] : {
          ...state,
          post   
        }
      }
      case DELETE_POST :
      return {
        ...state,   
        [post.category] : {
          ...state,
          post: null  
        }
      }
    
    default:
      return state
  }
}


//COMMENTS

const initialCommentsState = [
  { id: 0, parentId: 0, author: 'Mary', body: 'Salesforce is great!', voteScore: 5, } ,
  { id: 1, parentId: 0, author: 'Steve', body: 'I find this tutorial difficult to follow..', voteScore: 8, }, 
  { id: 2, parentId: 1, author: 'Sofia', body: 'Angular is great!', voteScore: 65, } ,
  { id: 3, parentId: 1, author: 'Jane', body: 'What about Angular 1.6? Will it be deprecated?', voteScore: 15, } 
]

function comments (state = initialCommentsState, action) {
 // const { post, comment, category, vote } = action

  switch(action.type){
    case ADD_EDIT_COMMENT :
    return {
      ...state,
      //TODO
    
    }
    case VOTE_COMMENT :
    return {
      ...state,  
      //TODO
    }
  case DELETE_COMMENT :
    return {
      ...state,
      //TODO
    }
    default:
    return state
  }
}   

export default combineReducers({
  categories,
  comments,
})