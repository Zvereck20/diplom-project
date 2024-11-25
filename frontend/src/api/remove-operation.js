export const removeOperation = (id) =>
	fetch(`/api/operation/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	}).then((res) => res.json());
