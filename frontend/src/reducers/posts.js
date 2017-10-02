import {
  GET_POST, RECIEVE_POSTS, CREATE_POST, EDIT_POST, VOTE_POST_UP, VOTE_POST_DOWN, DELETE_POST, SET_SORT_BY, RESET_SORT_BY, UPDATE_FORM_POST //post actions
} from '../actions/postActions';

const initialState = { 
  items: [],
  post: {
    title: '',
    author: '',
    body: '',
    category: {path: 'react', name: 'react'}
  },
  sortBy: {
    property : 'voteScore',
    order: 'desc'
  } 
}

export default function posts (state = initialState, action) {

  const { posts, items, post, category, sortBy, value } = action
  const property = action.name;

  switch (action.type) {
    case GET_POST: //done
      return {
        ...state,
        post
      }
    case RECIEVE_POSTS: //done
      return {
        ...state,
        items: [...posts]
      }
    case UPDATE_FORM_POST: //done
      return {
        ...state,
        post: {
          ...state.post,
          [property]: value
        }      
      }   
    case VOTE_POST_UP: //done
      return {
        ...state,
        items: state.items.map(item => {
          if(item.id === post.id){
            return post;
          }else{
            return item;
          }
        })      
      }
    case VOTE_POST_DOWN: //done
      return {
        ...state,
        items: state.items.map(item => {
          if(item.id === post.id){
            return post;
          }else{
            return item;
          }
      })     
    }
    case CREATE_POST :
      return {
        ...state,
        post: initialState.post,
        items: [...state.items, post]
      }  
    case EDIT_POST :
      return {
        ...state        
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