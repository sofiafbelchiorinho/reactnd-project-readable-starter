//ACTIONS

//post
export const CREATE_EDIT_POST = 'CREATE_EDIT_POST'
export const VOTE_POST = 'VOTE_POST'
export  const DELETE_POST = 'DELETE_POST'

//comment
export const ADD_EDIT_COMMENT = 'ADD_EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export  const DELETE_COMMENT = 'DELETE_COMMENT'


//ACTION CREATORS

//post
export function createEditPost({post, category}){
	return {
    type: CREATE_EDIT_POST,
    post,
    category
	}
}

export function votePost({post, vote}){
	return {
	  type: VOTE_POST,
    post,
    vote
	}
}

export function deletePost({post}){
	return {
		type: DELETE_POST,
    post
	}
}


//comment
export function addEditComment({comment, post}){
	return {
		type: ADD_EDIT_COMMENT,
    comment,
    post
	}
}

export function voteComment({comment, vote}){
	return {
		type: VOTE_COMMENT,
    comment,
    vote
	}   
}

export function deleteComment({post}){
	return {
		type: DELETE_POST,
    post
	}
}