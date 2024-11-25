import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, H2, Input, Notification, Select } from '../../../components';
import { INVOICE_TYPE } from '../../../constants';
import { addInvoiceAsync, editInvoiceAsync } from '../../../actions';
import { getInvoiceType } from '../../../utils';

const invoiceSchema = yup.object().shape({
	title: yup
		.string()
		.required('Заполните наименование счета')
		.min(3, 'Неверно заполнено наименование счета. Минимум 3 символа'),
	type: yup.number(),
	imageUrl: yup.string().url('Принимается только адрес изображения').nullable(),
});

export const InvoiceForm = ({ editing = false }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const params = useParams();
	const invoices = useSelector(({ invoice }) => invoice);

	const invoice = params.id && invoices.filter(({ id }) => id === params.id);

	const textValue = editing
		? {
				title: 'Редактировать счет',
				button: 'Сохранить',
			}
		: {
				title: 'Новый счет',
				button: 'Создать',
			};

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: { title: '', type: 0, imageUrl: '' },
		resolver: yupResolver(invoiceSchema),
	});

	if (editing) {
		setValue('title', invoice[0].title);
		setValue('type', invoice[0].type);
		setValue('imageUrl', invoice[0].imageUrl);
	}

	const onSubmit = ({ title, type, imageUrl }) => {
		if (editing) {
			dispatch(editInvoiceAsync(params.id, title, type, imageUrl));
		} else {
			dispatch(addInvoiceAsync(title, type, imageUrl));
		}

		navigate('/invoice');
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
					Наименование счета
				</Input>

				<Select selectedList={Object.keys(INVOICE_TYPE)} type={INVOICE_TYPE} getType={getInvoiceType} {...register('type')}>Тип счета</Select>

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
