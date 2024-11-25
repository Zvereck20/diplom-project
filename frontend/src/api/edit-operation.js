export const editOperation = (id, invoice, category, amount, comment) =>
	fetch(`/api/operation/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ invoice, category, amount, comment }),
	})
		.then((res) => res.json())