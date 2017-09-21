import {
  GET_POST, RECIEVE_POSTS, CREATE_POST, EDIT_POST, VOTE_POST_UP, VOTE_POST_DOWN, DELETE_POST, SET_SORT_BY, RESET_SORT_BY //post actions
} from '../actions/postActions'

const initialState = { 
  items: [],
  post: null,
  sortBy: {
    property : 'voteScore',
    order: 'desc'
  } 
}

export default function posts (state = initialState, action) {

  const { posts, items, post, category, sortBy } = action
  console.log('posts', posts);

  switch (action.type) {
    case GET_POST :
      return {
        ...state,
        post
      }
    case RECIEVE_POSTS :
      return {
        ...state,
        items: [...posts]
      }

    case CREATE_POST :
      return {
        ...state       
      }  
    case EDIT_POST :
      return {
        ...state        
      }
    case VOTE_POST_UP :
      return {
        ...state,
        items: state.items.map(item => {
          if(item.id == post.id){
            return post;
          }else{
            return item;
          }
        })      
      }
    case VOTE_POST_DOWN :
      return {
        ...state,
        items: state.items.map(item => {
          if(item.id == post.id){
            return post;
          }else{
            return item;
          }
      })     
    }
    case DELETE_POST :
      return {
        ...state   
      }
    case SET_SORT_BY:
      return {
        ...state,
        sortBy
      }
    case RESET_SORT_BY:
      return {
        ...state,
        sortBy
      }
    default:
        return state
  }
}