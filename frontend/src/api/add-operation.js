export const addOperation = (invoice, category, amount, comment) =>
	fetch(`/api/operation`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ invoice, category, amount, comment }),
	}).then((res) => res.json());
