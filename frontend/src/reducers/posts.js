import {
    RECIEVE_POSTS, FETCH_POSTS, CREATE_POST, EDIT_POST, VOTE_POST_UP, VOTE_POST_DOWN, DELETE_POST //post actions
} from '../actions/postActions'


export default function posts (state = {}, action) {

    const { posts, post, category } = action
    console.log('action.posts', action.posts);

    switch (action.type) {
        case RECIEVE_POSTS :
        return {
            ...state,
            posts: [...posts]
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