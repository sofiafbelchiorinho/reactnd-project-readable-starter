import {
  GET_POST, RECIEVE_POSTS, CREATE_POST, EDIT_POST, UPDATE_POST, DELETE_POST, SET_SORT_BY, RESET_SORT_BY, UPDATE_FORM_POST //post actions
} from '../actions/postActions';
import { RECIEVE_POST_COMMENTS } from '../actions/commentActions';

const initialState = { 
  items: [],
  post: {
    title: '',
    author: '',
    body: '',
    category: {path: 'react', name: 'react'},
    comments: []
  },
  sortBy: {
    property : 'voteScore',
    order: 'desc'
  },
  editMode: false 
}

export default function posts (state = initialState, action) {

  const { posts, items, post, category, sortBy, value, editMode, postId, comments } = action
  const property = action.name;

  switch (action.type) {
    case GET_POST: //done
      return {
        ...state,
        post
      }
    case RECIEVE_POST_COMMENTS: //done
      return {
        ...state,
        items: state.items.map(item => {
          if(item.id === postId){
            item.comments = comments;
          }
          return item;          
      })
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
    case UPDATE_POST: //done
      return {
        ...state,
        post,
        items: state.items.map(item => {
          if(item.id === post.id){
            return post;
          }else{
            return item;
          }
      })     
    }
    case CREATE_POST: //done
      return {
        ...state,
        post: initialState.post,
        items: [...state.items, post],
        editMode: false
      }  
    case EDIT_POST: //done
      return {
        ...state,
        editMode,
        post: editMode ? post: initialState.post,   
      }
    case DELETE_POST: //done
      return {
        ...state,   
        post,
        items: state.items.filter(item => item.id !== post.id)
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