import { ACTION_TYPE } from './action-type';

export const editUserAsync = (data) => (dispatch) => {
	return fetch(`/api/edit-user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then(({ data }) => {
			dispatch({ type: ACTION_TYPE.EDIT_USER, payload: { ...data } });
			return true;
		});
};
