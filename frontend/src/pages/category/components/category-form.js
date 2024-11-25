import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, H2, Input, Notification, Select } from '../../../components';
import { CATEGORY_TYPE } from '../../../constants';
import { addCategoryAsync, editCategoryAsync } from '../../../actions';
import { getCategoryType } from '../../../utils';

const categorySchema = yup.object().shape({
	title: yup
		.string()
		.required('Заполните наименование категории')
		.min(3, 'Неверно заполнено наименование категории. Минимум 3 символа'),
	type: yup.number(),
	imageUrl: yup.string().url('Принимается только адрес изображения').nullable(),
});

export const CategoryForm = ({ editing = false }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const params = useParams();
	const categories = useSelector(({ category }) => category);

	const category = params.id && categories.filter(({ id }) => id === params.id);

	const textValue = editing
		? {
				title: 'Редактировать категорию',
				button: 'Сохранить',
			}
		: {
				title: 'Новая категория',
				button: 'Создать',
			};

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: { title: '', type: 0, imageUrl: '' },
		resolver: yupResolver(categorySchema),
	});

	if (editing) {
		setValue('title', category[0].title);
		setValue('type', category[0].type);
		setValue('imageUrl', category[0].imageUrl);
	}

	const onSubmit = ({ title, type, imageUrl }) => {
		if (editing) {
			dispatch(editCategoryAsync(params.id, title, type, imageUrl))
		} else {
			dispatch(addCategoryAsync(title, type, imageUrl));
		}
		navigate('/category');
	};

	const formError =
		errors?.title?.message || errors?.type?.message || errors?.imageUrl?.message;

	return (
		<div className="h-full flex items-center flex-col relative">
			{formError && <Notification>{formError}</Notification>}

			<H2>{textValue.title}</H2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="p-7 border border-black border-solid"
			>
				<Input type="text" placeholder="Назови меня" {...register('title')}>
					Наименование категории
				</Input>

				<Select selectedList={Object.keys(CATEGORY_TYPE)} type={CATEGORY_TYPE} getType={getCategoryType} {...register('type')}>Тип категории</Select>

				<Input type="text" placeholder="http//..." {...register('imageUrl')}>
					Адрес изображения
				</Input>

				<Button type="submit" disabled={!!formError}>
					{textValue.button}
				</Button>
			</form>
		</div>
	);
};
