import { ACTION_TYPE } from './action-type';

export const removeInvoiceAsync = (id) => (dispatch) =>
	fetch(`/api/invoice/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
		.then((res) => res.json())
		.then(({ error }) => {
			if (!error) {
				dispatch({ type: ACTION_TYPE.REMOVE_INVOICE, payload: id });
			}
		});
