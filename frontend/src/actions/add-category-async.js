import { ACTION_TYPE } from './action-type';

export const addCategoryAsync = (title, type, imageUrl) => (dispatch) => {
	const body = imageUrl.length
		? {
				title,
				type,
				imageUrl,
			}
		: {
				title,
				type,
			};

	return fetch(`/api/category`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then(({ data }) => {
			dispatch({ type: ACTION_TYPE.ADD_CATEGORY, payload: data });
		});
};
