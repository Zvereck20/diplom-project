import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { H2, Input, Notification, Button } from '../../components';
import { FORM_REGEXP } from '../../constants';
import { editUserAsync } from '../../actions';

const userSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required('Заполните поле электронной почты')
		.matches(FORM_REGEXP.EMAIL, 'Неверно заполнено поле электронной почты')
		.min(5, 'Неверно заполнено электронной почты. Минимум 5 символа'),
	password: yup
		.string()
		.matches(
			FORM_REGEXP.PASSWORD,
			'Неверный пароль. Должен содержать число, спецсимвол, латинскую букву в нижнем и врехнем регистре',
		)
		.min(6, 'Неверный пароль. Должно быть не меньше 6 символов')
		.max(20, 'Неверный пароль. Должно быть не больше 20 символов'),
	passcheck: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
	imageUrl: yup.string().url('Принимается только адрес изображения').nullable(),
});

export const User = () => {
	const [serverResult, setServerResult] = useState('');
	const user = useSelector(({ user }) => user);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: user.email,
			password: '',
			passcheck: '',
			imageUrl: user.imageUrl,
		},
		resolver: yupResolver(userSchema),
	});

	const onSubmit = ({ email, password, imageUrl }) => {
		dispatch(editUserAsync({ email, password, imageUrl })).then(
			(res) => res && setServerResult('Данные обновленны'),
		);
	};

	const formError =
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message ||
		errors?.imageUrl?.message;

	return (
		<div className="h-full flex items-center justify-center flex-col">
			{formError && <Notification>{formError}</Notification>}
			{serverResult && <Notification status="message">{serverResult}</Notification>}

			<H2>Пользователь</H2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="p-7 border border-black border-solid"
			>
				<Input type="email" placeholder="test@example.com" {...register('email')}>
					Электронная почта
				</Input>
				<Input type="password" placeholder="******" {...register('password')}>
					Пароль
				</Input>
				<Input type="password" placeholder="******" {...register('passcheck')}>
					Проверка пароля
				</Input>
				<Input type="text" placeholder="http//..." {...register('imageUrl')}>
					Адрес изображения
				</Input>

				<Button type="submit" disabled={!!formError}>
					Сохранить
				</Button>
			</form>
		</div>
	);
};
