import { ACTION_TYPE } from './action-type';

export const loadCategoriesAsync = () => (dispatch) => {
	fetch(`/api/category`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
		.then((res) => res.json())
		.then(({data}) => {      
			dispatch({ type: ACTION_TYPE.LOAD_CATEGORIES, payload: data });
		});
};
