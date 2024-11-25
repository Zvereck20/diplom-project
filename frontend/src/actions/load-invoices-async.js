import { ACTION_TYPE } from './action-type';

export const loadInvoicesAsync = () => (dispatch) => {
	fetch(`/api/invoice`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
		.then((res) => res.json())
		.then(({data}) => {      
			dispatch({ type: ACTION_TYPE.LOAD_INVOICES, payload: data });
		});
};
