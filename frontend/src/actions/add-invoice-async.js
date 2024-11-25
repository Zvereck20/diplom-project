import { ACTION_TYPE } from './action-type';

export const addInvoiceAsync = (title, type, imageUrl) => (dispatch) => {
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

	return fetch(`/api/invoice`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(body),
	})
		.then((res) => res.json())
		.then(({ data }) => {      
			dispatch({ type: ACTION_TYPE.ADD_INVOICE, payload: data });
		});
};