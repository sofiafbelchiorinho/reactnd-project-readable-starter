export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT_UP = 'VOTE_COMMENT_UP'
export const VOTE_COMMENT_DOWN = 'VOTE_COMMENT_DOWN'
export  const DELETE_COMMENT = 'DELETE_COMMENT'

export const recieveComments = posts => (
	{
		type: FETCH_COMMENTS,
		posts
	}
);

export function addComment({comment, post}){
	return {
		type: ADD_COMMENT,
    comment,
    post
	}
}

export function editComment({comment, post}){
	return {
		type: EDIT_COMMENT,
    comment,
    post
	}
}

export function voteCommentUp({comment}){
	return {
		type: VOTE_COMMENT_UP,
    comment
	}   
}

export function voteCommentDown({comment}){
	return {
		type: VOTE_COMMENT_DOWN,
    comment
	}   
}

export function deleteComment({post}){
	return {
		type: DELETE_COMMENT,
    post
	}
}