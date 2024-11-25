import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadOperations } from '../../api';
import { Button } from '../../components';
import { Shedule } from './components';

export const Main = () => {
	const [loader, setLoader] = useState(false);
	const [expenseOperations, setExpenseOperations] = useState([]);
	const [incomeOperations, setIncomeOperations] = useState([]);
	const [graphicsCategory, setGraphicsCategory] = useState('expense');
	const invoices = useSelector(({ invoice }) => invoice);
	const categories = useSelector(({ category }) => category);

	const categoriesIncome = categories.filter(({ type }) => type === 1);
	const categoriesExpense = categories.filter(({ type }) => type === 0);

	useEffect(() => {
		setLoader(true);

		loadOperations(1, '', 10).then(({ data: { operations } }) => {
			const expense = operations.filter(({ category }) => category.type === 0);
			const income = operations.filter(({ category }) => category.type === 1);

			setExpenseOperations(expense);
			setIncomeOperations(income);
			setLoader(false);
		});
	}, []);

	if (loader) {
		return <div className="loader"></div>;
	}

	return (
		<div className="my-8 px-20">
			<div className="flex gap-7 ">
				<div className="w-full p-5 flex flex-col border border-black">
					<div className="flex items-center justify-between border-b border-black pb-3">
						<h3>Доходы </h3>
						<Link to="/category/add">+</Link>
					</div>

					<ul className="mt-5">
						{categoriesIncome.map(({ id, title, imageUrl }) => (
							<li key={id}>
								<Link
									to={`/category/${id}`}
									className="flex items-center justify-between p-4 bg-white rounded-lg w-full mb-6"
								>
									<span>{title}</span>{' '}
									<img
										src={imageUrl}
										alt={title}
										className="block w-9"
									/>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="w-full p-5 flex flex-col border border-black">
					<div className="flex items-center justify-between border-b border-black pb-3">
						<h3>Счета</h3>
						<Link to="/invoice/add">+</Link>
					</div>

					<ul className="mt-5">
						{invoices.map(({ id, title, imageUrl }) => (
							<li key={id}>
								<Link
									to={`/invoice/${id}`}
									className="flex items-center justify-between p-4 bg-white rounded-lg w-full mb-6"
								>
									<span>{title}</span>{' '}
									<img
										src={imageUrl}
										alt={title}
										className="block w-9"
									/>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="w-full p-5 flex flex-col border border-black">
					<div className="flex items-center justify-between border-b border-black pb-3">
						<h3>Расходы </h3>
						<Link to="/category/add">+</Link>
					</div>

					<ul className="mt-5">
						{categoriesExpense.map(({ id, title, imageUrl }) => (
							<li key={id}>
								<Link
									to={`/category/${id}`}
									className="flex items-center justify-between p-4 bg-white rounded-lg w-full mb-6"
								>
									<span>{title}</span>{' '}
									<img
										src={imageUrl}
										alt={title}
										className="block w-9"
									/>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="bg-white mt-10 p-5 pt-6 rounded-2xl">
				<div className="flex w-56 gap-4">
					<Button
						disabled={graphicsCategory === 'expense'}
						onClick={() => setGraphicsCategory('expense')}
					>
						Расходы
					</Button>
					<Button
						disabled={graphicsCategory === 'income'}
						onClick={() => setGraphicsCategory('income')}
					>
						Доходы
					</Button>
				</div>
				{graphicsCategory === 'expense' ? (
					<Shedule data={expenseOperations} />
				) : (
					<Shedule data={incomeOperations} />
				)}
			</div>
		</div>
	);
};
