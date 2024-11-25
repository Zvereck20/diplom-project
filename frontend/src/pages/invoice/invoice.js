import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { H2, Button } from '../../components';
import { getInvoiceType } from '../../utils';
import { InvoiceForm } from './components';
import { removeInvoiceAsync } from '../../actions';

export const Invoice = () => {
	const invoices = useSelector((state) => state.invoice);
	const isAddition = !!useMatch('/invoice/add');
	const isEditing = !!useMatch('/invoice/:id');

	const dispatch = useDispatch();

	if (isAddition) {
		return <InvoiceForm />;
	}

	if (isEditing) {
		return <InvoiceForm editing={true} />;
	}

	const onRemoveInvoice = (id) => {
		dispatch(removeInvoiceAsync(id));
	};

	return (
		<div className="h-full flex items-center flex-col relative">
			<H2>Список счетов</H2>

			<ul className="p-7 border border-black border-solid w-9/12">
				<Link
					to="/invoice/add"
					className="block p-2 shadow-inner w-full bg-yellow-400 mb-6 text-xl font-semibold text-center"
				>
					Добавить счет
				</Link>
				{invoices.map(({ id, imageUrl, title, type }) => (
					<li
						key={id}
						className="flex items-center justify-between px-4 bg-white rounded-lg w-full mb-6"
					>
						<div className="text-xl">{getInvoiceType(type)}</div>
						<div className="flex items-center gap-4">
							<h3>{title}</h3>
							<img
								src={imageUrl}
								alt="Изображение счета"
								className="block w-1/4"
							/>
						</div>
						<div className="flex items-center gap-4">
							<Link
								to={`/invoice/${id}`}
								className="block p-2 shadow-inner w-full my-3 bg-green-400"
							>
								Редактировать
							</Link>
							<Button
								type="button"
								color="bg-red-600 text-white"
								onClick={() => onRemoveInvoice(id)}
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
