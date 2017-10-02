import { api, headers, GET, POST, DELETE } from '../config'
import _ from 'lodash';

export const GET_POST = 'RECIEVE_POST'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST_UP = 'VOTE_POST_UP'
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN'
export const DELETE_POST = 'DELETE_POST'
export const SET_SORT_BY = 'SET_SORT_BY'
export const RESET_SORT_BY = 'RESET_SORT_BY'
export const UPDATE_FORM_POST = 'UPDATE_FORM_POST'

// sort
export function resetSortingOrder(){
	return {
		type: SET_SORT_BY,
		sortBy: {
			property : 'voteScore',
			order: 'desc'
		}
	}
}
export function setSortingOrder({property, order}){
	return {
		type: SET_SORT_BY,
		sortBy: {
			property,
			order
		}
	}
}

//GET /posts/:id
export function getPost(post){
	return {
		type: GET_POST,
		post
	}
}
export const fetchPost = (id) => dispatch => {
  console.log('fetchPost', id);
  return fetch(`${api}/posts/${id}`, GET)	
    .then(res => res.json())
    .then((post) => {
      dispatch(getPost(post));
    })
};

//GET /posts/
export function recievePosts(posts){
	return {
		type: RECIEVE_POSTS,
		posts
	}
}
export const fetchPosts = () => dispatch => (
	fetch(`${api}/posts`, GET)	
    .then(res => res.json())
    .then((posts) => {
      dispatch(recievePosts(posts));
    })
);


// POST /posts/:id, option
export const votePost = (id, option) => dispatch => {
	var request = new Request(`${api}/posts/${id}`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({option}) 
	});
	return fetch(request)	
	.then(res => res.json())
	.then((post) => {
		if(option === 'upVote') 
			dispatch(votePostUp(post)); 
		if(option === 'downVote') 
			dispatch(votePostDown(post)); 
	})
};

//create, update
export function updateFormPost({name, value}){
	return {
		type: UPDATE_FORM_POST,
		name,
		value
	}
}
export function votePostUp(post){
	return {
		type: VOTE_POST_UP,
		post
	}
}  
export function votePostDown(post){
	return {
		type: VOTE_POST_DOWN,
		post
	}
}

// POST /posts/:id, post
export const newPost = (post) => dispatch =>{
	var request = new Request(`${api}/posts/`, {
		method: 'POST',
		headers: headers,
		body:  JSON.stringify({
	      id: (new Date()).getTime().toString(),
		  timestamp: (new Date()).getTime(),
		  title: post.title,
		  body: post.body,
		  author: post.author,
		  category: post.category.name,
		})
	});
	return fetch(request)	
	.then(res => res.json())
	.then((response) => {
		dispatch(createPost(response)); 
	})
}

export function createPost(post){
	return {
		type: CREATE_POST,
		post
	}
}

export function editPost(post){
	return {
		type: EDIT_POST,
		post
	}
}

export function deletePost(post){
	return {
		type: DELETE_POST,
    	post
	}
}
