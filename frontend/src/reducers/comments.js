import {
  RECIEVE_COMMENTS, ADD_COMMENT, EDIT_COMMENT, VOTE_COMMENT_UP, VOTE_COMMENT_DOWN, DELETE_COMMENT //comment actions
} from '../actions/commentActions'

//COMMENTS

const initialCommentsState = [];
  
export default function comments (state = { items: [] }, action) {
   const { comments, comment } = action
  
  switch(action.type){
    case RECIEVE_COMMENTS :
      return {
        ...state,
        items: [...comments]     
      }
    case ADD_COMMENT :
      return {
        ...state,
        //TODO      
      }
    case EDIT_COMMENT :
      return {
        ...state,
        //TODO      
      }
    case VOTE_COMMENT_UP :
      return {
        ...state,
        //TODO      
      }
    case VOTE_COMMENT_DOWN :
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