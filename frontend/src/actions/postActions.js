import { api, GET, POST, DELETE } from '../config'

export const GET_POST = 'RECIEVE_POST'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST_UP = 'VOTE_POST_UP'
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN'
export  const DELETE_POST = 'DELETE_POST'


export function getPost(post){
	return {
		type: GET_POST,
		post
	}
}

export const fetchPost = (id) => dispatch => {
  console.log('fetchPost', id);
  return fetch(`${api}/posts/${id}`, GET)	
    .then(res => { return(res.text())})
    .then((post) => {
      post = JSON.parse(post);
      dispatch(getPost(post));
    })
};

export function recievePosts(posts){
	return {
		type: RECIEVE_POSTS,
		posts
	}
}

export const fetchPosts = () => dispatch => (
	fetch(`${api}/posts`, GET)	
    .then(res => { return(res.text())})
    .then((posts) => {
      posts = JSON.parse(posts);
      dispatch(recievePosts(posts));
    })
);

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

export function votePostUp({post}){
	return {
		type: VOTE_POST_UP,
		post
	}
}

export function votePostDown({post}){
	return {
		type: VOTE_POST_DOWN,
		post
	}
}

export function deletePost({post}){
	return {
		type: DELETE_POST,
    	post
	}
}
