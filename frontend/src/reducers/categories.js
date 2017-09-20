import {
    RECIEVE_CATEGORIES, GET_CATEGORY, SET_CATEGORY
  } from '../actions/categoryActions'  

  export default function categories (state = { items: [] }, action) {
     const { categories, category } = action
    
    switch(action.type){
      case RECIEVE_CATEGORIES :
        return {
          ...state,
          items: [...categories]     
        }
      case SET_CATEGORY :
        return {
          ...state,
          category      
        }
        default:
        return state
      }
    }   