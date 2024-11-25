import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { H2, Button } from '../../components';
import { getCategoryType } from '../../utils';
import { CategoryForm } from './components';
import { removeCategoryAsync } from '../../actions';

export const Category = () => {
	const categories = useSelector((state) => state.category);
	const isAddition = !!useMatch('/category/add');
	const isEditing = !!useMatch('/category/:id');

	const dispatch = useDispatch();

	if (isAddition) {
		return <CategoryForm />;
	}

	if (isEditing) {
		return <CategoryForm editing={true} />;
	}

	const onRemoveCategory = (id) => {
		dispatch(removeCategoryAsync(id));
	};

	return (
		<div className="h-full flex items-center flex-col relative">
			<H2>Список категорий</H2>

			<ul className="p-7 border border-black border-solid w-9/12">
				<Link
					to="/category/add"
					className="block p-2 shadow-inner w-full bg-yellow-400 mb-6 text-xl font-semibold text-center"
				>
					Добавить категорию
				</Link>
				{categories.map(({ id, imageUrl, title, type }) => (
					<li
						key={id}
						className="flex items-center justify-between px-4 bg-white rounded-lg w-full mb-6"
					>
						<div className="text-xl">{getCategoryType(type)}</div>
						<div className="flex items-center gap-4">
							<h3>{title}</h3>
							<img
								src={imageUrl}
								alt="Изображение категории"
								className="block w-1/4"
							/>
						</div>
						<div className="flex items-center gap-4">
							<Link
								to={`/category/${id}`}
								className="block p-2 shadow-inner w-full my-3 bg-green-400"
							>
								Редактировать
							</Link>
							<Button
								type="button"
								color="bg-red-600 text-white"
								onClick={() => onRemoveCategory(id)}
							>
								Удалить
							</Button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
