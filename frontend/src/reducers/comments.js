import {
  RECIEVE_COMMENTS, UPDATE_FORM_COMMENT, EDIT_COMMENT, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT //comment actions
} from '../actions/commentActions'

//COMMENTS
  
const initialState = {
  items: [],
  comment: {
    body: '',
    author: ''
  },
  editMode: false 
}
export default function comments (state = initialState, action) {
   const { comments, comment, editMode, value } = action;
   const property = action.name;
   
  
  switch(action.type){
    case RECIEVE_COMMENTS: //done
      return {
        ...state,
        items: [...comments]     
      }
    case EDIT_COMMENT: //done
      return {
        ...state,
        editMode,
        comment: editMode ? comment : initialState.comment,   
      }
    case UPDATE_FORM_COMMENT: //done
      return {
        ...state,
        comment: {
          ...state.comment,
          [property]: value
        }      
      }   
    case UPDATE_COMMENT: //done
      return {
        ...state,
        comment,
        items: state.items.map(item => {
          if(item.id === comment.id){
            return comment;
          }else{
            return item;
          }
      })     
    }
    case ADD_COMMENT: //done
      return {
        ...state,
        comment: initialState.comment,
        items: [...state.items, comment],
        editMode: false
      } 

    case DELETE_COMMENT: //done
      return {
        ...state,   
        comment,
        items: state.items.filter(item => item.id !== comment.id)
      } 
     default:
      return state
    }
  }   