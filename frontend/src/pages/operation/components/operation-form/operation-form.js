import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, H2, Input, Notification } from '../../../../components';
import { SelectValue } from '../select-value/select-value';
import { getOperation, addOperation, editOperation } from '../../../../api';
import { getCategoryType, getInvoiceType } from '../../../../utils';

const operationSchema = yup.object().shape({
	invoice: yup.string(),
	category: yup.string(),
	amount: yup.number(),
	comment: yup
		.string()
		.min(3, 'Неверно заполнено наименование категории. Минимум 3 символа'),
});

export const OperationForm = ({ editing = false, setToUpdate, toUpdate }) => {
	const [loader, setLoader] = useState(false);
	const [operation, setOperation] = useState(null);
	const invoices = useSelector(({ invoice }) => invoice);
	const categories = useSelector(({ category }) => category);
	const navigate = useNavigate();

	const params = useParams();

	useEffect(() => {
		setLoader(true);
		if (params.id) {
			getOperation(params.id).then(({ data }) => {
				setOperation(data);
				setLoader(false);
			});
		}
	}, [params.id]);

	const textValue = editing
		? {
				title: 'Редактировать операцию',
				button: 'Сохранить',
			}
		: {
				title: 'Новая операция',
				button: 'Создать',
			};

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			invoice: invoices[0].id,
			category: categories[0].id,
			amount: null,
			comment: '',
		},
		resolver: yupResolver(operationSchema),
	});

	if (editing && operation) {
		setValue('invoice', operation.invoice.id);
		setValue('category', operation.category.id);
		setValue('amount', operation.amount);
		setValue('comment', operation.comment);
	}

	const onSubmit = ({ invoice, category, amount, comment }) => {
		if (editing) {
			editOperation(params.id, invoice, category, amount, comment);
		} else {
			addOperation(invoice, category, amount, comment);
		}

		setToUpdate(!toUpdate);
		navigate('/operation');
	};

	const formError = errors?.comment?.message;

	if (loader) {
		return <div className="loader"></div>;
	}

	return (
		<div className="h-full flex items-center flex-col relative">
			{formError && <Notification>{formError}</Notification>}

			<H2>{textValue.title}</H2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="p-7 border border-black border-solid"
			>
				<SelectValue
					selectedList={invoices}
					categoryType={getInvoiceType}
					{...register('invoice')}
				>
					Выберите счет
				</SelectValue>
				<SelectValue
					selectedList={categories}
					categoryType={getCategoryType}
					{...register('category')}
				>
					Выберите категорию
				</SelectValue>

				<Input type="number" placeholder="4500" {...register('amount')}>
					Введите сумм
				</Input>

				<Input type="text" placeholder="..." {...register('comment')}>
					Введите комментарий
				</Input>

				<Button type="submit" disabled={!!formError}>
					{textValue.button}
				</Button>
			</form>
		</div>
	);
};
