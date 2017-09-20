import {
  GET_POST, RECIEVE_POSTS, CREATE_POST, EDIT_POST, VOTE_POST_UP, VOTE_POST_DOWN, DELETE_POST //post actions
} from '../actions/postActions'


export default function posts (state = { items: [] }, action) {

  const { posts, post, category } = action
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
        ...state,
        [category] : {
        ...state,
        post          
      }
    }
    case EDIT_POST :
      return {
        ...state,
        [category] : {
        ...state,
        post          
      }
    }
    case VOTE_POST_UP :
      return {
        ...state,
        [category] : {
        ...state,
        post          
      }
    }
    case VOTE_POST_DOWN :
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