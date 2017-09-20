import { api, GET, POST, DELETE } from '../config'

export const GET_CATEGORY = 'GET_CATEGORY'
export const SET_CATEGORY = 'SET_CATEGORY'
export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'

//GET /categories/:id
export function getCategory(category){
	return {
		type: GET_CATEGORY,
		category
	}
}
export const fetchCategory = (id) => dispatch => (
	fetch(`${api}/categories/${id}`, GET)	
    .then(res => res.json())
    .then((category) => {
      dispatch(getCategory(category));
    })
);

//GET /categories
export const fetchCategories = () => dispatch => {

  return fetch(`${api}/categories/`, GET)	
    .then(res => res.json())
    .then((data) => {
      dispatch(recieveCategories(data.categories));
    })
};
export const recieveCategories = categories => (
	{
		type: RECIEVE_CATEGORIES,
		categories
	}
);

export function setCurrentCategory(category){
	return {
		type: SET_CATEGORY,
		category
	}
}

