export const getOperation = (id) =>
	fetch(`/api/operation/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	}).then((res) => res.json());
