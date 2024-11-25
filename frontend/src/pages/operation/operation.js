import { useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { H2, Button, Select } from '../../components';
import { OperationForm, Pagination } from './components';
import { useEffect, useState } from 'react';
import { loadOperations } from '../../api/load-operations';
import { removeOperation } from '../../api';
import { changeDateFormat, getSortCategory } from '../../utils';
import { SORT_CAREGORY } from '../../constants';

export const Operation = () => {
	const [loader, setLoader] = useState(false);
	const [operations, setOperations] = useState([]);
	const [page, setPage] = useState(1);
	const [sortCategory, setSortCategory] = useState('');
	const [lastPage, setLastPage] = useState(1);
	const [toUpdate, setToUpdate] = useState(false);
	const isAddition = !!useMatch('/operation/add');
	const isEditing = !!useMatch('/operation/:id');

	useEffect(() => {
		setLoader(true);

		if (!isAddition || !isEditing) {
			loadOperations(page, sortCategory).then(
				({ data: { operations, lastPage } }) => {
					setOperations(operations);
					setLastPage(lastPage);
					setLoader(false);
				},
			);
		}
	}, [isAddition, isEditing, toUpdate, page, sortCategory]);

	if (isAddition) {
		return <OperationForm setToUpdate={setToUpdate} toUpdate={toUpdate} />;
	}

	if (isEditing) {
		return (
			<OperationForm setToUpdate={setToUpdate} toUpdate={toUpdate} editing={true} />
		);
	}

	if (loader) {
		return <div className="loader"></div>;
	}

	const onRemoveOperation = (id) => {
		removeOperation(id).then(() => setToUpdate(!toUpdate));
	};

	const onSelectSort = ({ target }) => {
		if (sortCategory !== target.value) {
			setSortCategory(target.value);
		}
	};

	return (
		<div className="h-full flex items-center flex-col relative">
			<H2>История операций</H2>

			<div className="p-7 border border-black border-solid w-9/12">
				<Link
					to="/operation/add"
					className="block p-2 shadow-inner w-full bg-yellow-400 mb-6 text-xl font-semibold text-center"
				>
					Создать операцию
				</Link>

				<Select
					selectedList={Object.keys(SORT_CAREGORY)}
					type={SORT_CAREGORY}
					getType={getSortCategory}
					onChange={onSelectSort}
					value={sortCategory}
					style={{ marginBottom: '40px' }}
				>
					Сортировать по полю:
				</Select>
				{operations.map(
					({ id, comment, amount, category, invoice, createdAt }) => (
						<div
							key={id}
							className="flex items-center justify-between px-4 bg-white rounded-lg w-full mb-6"
						>
							<div className="flex items-center gap-4">
								<div className="w-24">{changeDateFormat(createdAt)}</div>
								<h3 className="w-52">{comment}</h3>
								<div className="w-24">{amount} ₽</div>
								<div className="w-26 flex items-center" title="счет">
									{invoice.title}&nbsp;&nbsp;
									<img
										src={invoice.imageUrl}
										alt="Изображение категории"
										className="block w-1/4"
									/>
								</div>

								<div className="w-26 flex items-center" title="категория">
									{category.title}&nbsp;&nbsp;
									<img
										src={category.imageUrl}
										alt="Изображение категории"
										className="block w-1/4"
									/>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<Link
									to={`/operation/${id}`}
									className="block p-2 shadow-inner w-full my-3 bg-green-400"
								>
									Редактировать
								</Link>
								<Button
									type="button"
									color="bg-red-600 text-white"
									onClick={() => onRemoveOperation(id)}
								>
									Удалить
								</Button>
							</div>
						</div>
					),
				)}
				{lastPage > 1 && (
					<Pagination page={page} lastPage={lastPage} setPage={setPage} />
				)}
			</div>
		</div>
	);
};
