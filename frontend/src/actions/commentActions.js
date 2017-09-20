import { api, GET, POST, DELETE } from '../config'

export const GET_COMMENT = 'GET_COMMENT'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT_UP = 'VOTE_COMMENT_UP'
export const VOTE_COMMENT_DOWN = 'VOTE_COMMENT_DOWN'
export  const DELETE_COMMENT = 'DELETE_COMMENT'

//GET /comments/:id
export function getComment(comment){
	return {
		type: GET_COMMENT,
		comment
	}
}
export const fetchComment = (id) => dispatch => {

  return fetch(`${api}/comments/${id}`, GET)	
    .then(res => res.json())
    .then((comment) => {
      dispatch(getComment(comment));
    })
};

//GET /posts/:id/comments
export const recieveComments = comments => (
	{
		type: RECIEVE_COMMENTS,
		comments
	}
);

export const fetchComments = (id) => dispatch => (
	fetch(`${api}/posts/${id}/comments`, GET)	
    .then(res => res.json())
    .then((comments) => {
      dispatch(recieveComments(comments));
    })
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