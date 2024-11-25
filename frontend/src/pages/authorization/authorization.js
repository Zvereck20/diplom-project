import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { H2, Input, Notification, Button } from '../../components';
import { FORM_REGEXP } from '../../constants';
import { authentication } from '../../api';
import { loadInvoicesAsync, loadCategoriesAsync, setUser } from '../../actions';
import { clearState } from '../../utils';

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required('Заполните поле электронной почты')
		.matches(FORM_REGEXP.EMAIL, 'Неверно заполнено поле электронной почты')
		.min(5, 'Неверно заполнено электронной почты. Минимум 5 символа'),
	password: yup
		.string()
		.required('Заполните поле пароль')
		.matches(
			FORM_REGEXP.PASSWORD,
			'Неверный пароль. Должен содержать число, спецсимвол, латинскую букву в нижнем и врехнем регистре',
		)
		.min(6, 'Неверный пароль. Должно быть не меньше 6 символов')
		.max(20, 'Неверный пароль. Должно быть не больше 20 символов'),
});

export const Authorization = () => {
	const [serverError, setServerError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const onSubmit = ({ email, password }) => {
		authentication('login', email, password)
			.then((res) => res.json())
			.then(({ error, user }) => {
				if (error) {
					setServerError(error);
					return;
				}

				clearState();

				dispatch(loadCategoriesAsync());
				dispatch(loadInvoicesAsync());
				dispatch(setUser(user));

				navigate('/main');
			});
	};

	const formError = errors?.email?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	return (
		<div className="h-full flex items-center justify-center flex-col">
			{errorMessage && <Notification>{errorMessage}</Notification>}

			<H2>Вход</H2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="p-7 border border-black border-solid"
			>
				<Input type="email" placeholder="test@example.com" {...register('email')}>
					Электронная почта
				</Input>
				<Input type="password" {...register('password')} placeholder="******">
					Пароль
				</Input>

				<Button type="submit" disabled={!!formError}>
					Войти
				</Button>

				<Link to="/register" className="text-blue-400 underline">
					Регистрация
				</Link>
			</form>
		</div>
	);
};
