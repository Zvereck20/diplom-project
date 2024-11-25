import { Button } from '../../../../components';

export const Pagination = ({ page, lastPage, setPage }) => {
	return (
		<div className="flex gap-2 items-center">
			<Button
				color="bg-yellow-300"
				disabled={page === 1}
				onClick={() => setPage(1)}
			>
				В начало
			</Button>
			<Button
				color="bg-yellow-300"
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				Предыдущая
			</Button>
			<div className="w-1/2 px-3">Страница: {page}</div>
			<Button
				color="bg-yellow-300"
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				Следующая
			</Button>
			<Button
				color="bg-yellow-300"
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
};
