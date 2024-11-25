export const authentication = async (action, email, password) =>
	fetch(`/api/${action}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});
