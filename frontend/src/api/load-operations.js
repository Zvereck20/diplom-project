export const loadOperations = (page = 1, sortCategory = "", limit = 5) =>
	fetch(
		`/api/operation?page=${page}&limit=${limit}&sortCategory=${sortCategory}`,
		{
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			},
			method: 'GET',
		},
	).then((res) => res.json());
