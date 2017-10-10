import { api, headers, GET, POST, DELETE } from '../config'
import _ from 'lodash';

export const GET_COMMENT = 'GET_COMMENT'
export const RECIEVE_COMMENTS = 'RECIEVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const UPDATE_FORM_COMMENT = 'UPDATE_FORM_COMMENT'

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

// POST /posts/, post
export const newComment = ({post, comment}) => dispatch =>{
	var request = new Request(`${api}/comments/`, {
		method: 'POST',
		headers: headers,
		body:  JSON.stringify({
			id: comment.id || (new Date()).getTime().toString(),
		  timestamp: comment.timestamp || (new Date()).getTime(),
      body: comment.body,
      author: comment.author,
      parentId: post.id,
		})
	});
	return fetch(request)	
	.then(res => res.json())
	.then((response) => {
		dispatch(addComment(response)); 
	})
}

export function addComment(comment){
	return {
		type: ADD_COMMENT,
		comment
	}
}

// POST /comments/:id, option
export const voteComment = (id, option) => dispatch => {
	var request = new Request(`${api}/comments/${id}`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({option}) 
	});
	return fetch(request)	
	.then(res => res.json())
	.then((post) => {
		dispatch(update(post)); 
	})
};

//create, update
export function updateFormComment({name, value}){
	return {
		type: UPDATE_FORM_COMMENT,
		name,
		value
	}
}

export const updateComment = (comment) => dispatch =>{
	var request = new Request(`${api}/comments/${comment.id}`, {
		method: 'PUT',
		headers: headers,
		body: JSON.stringify({
		  body: comment.body,
		}),
	});
	return fetch(request)	
	.then(res => res.json())
	.then((response) => {
		dispatch(update(response)); 
	})
}

export function update(comment){
	return {
		type: UPDATE_COMMENT,
		comment
	}
}
export function toggleEditComment(comment, editMode){
	return {
		type: EDIT_COMMENT,
		comment,
		editMode
	}
}

export function remove(comment){
	return {
		type: DELETE_COMMENT,
    	comment
	}
}

export const removeComment = (comment) => dispatch => {
	var request = new Request(`${api}/comments/${comment.id}`, {
		method: 'DELETE',
		headers: headers
	});
	return fetch(request)	
	.then(res => res.json())
	.then((post) => {
		dispatch(remove(post)); 
	})
};

