import { api, headers, GET, POST, DELETE } from '../config'

export const GET_POST = 'RECIEVE_POST'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST_UP = 'VOTE_POST_UP'
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN'
export  const DELETE_POST = 'DELETE_POST'

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

export function createPost({post, category}){
	return {
		type: CREATE_POST,
		post,
		category
	}
}

export function editPost({post, category}){
	return {
		type: EDIT_POST,
		post,
		category
	}
}

export function deletePost({post}){
	return {
		type: DELETE_POST,
    	post
	}
}
