import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = () => {
	const user = useSelector(({user}) => user);

	return (
		<div className="w-full border-b border-black p-6 flex justify-between items-center">
			<div className="flex gap-4">
				<Link to="/main" className="underline hover:text-green-600">
					Главная
				</Link>
				<Link to="/operation" className="underline hover:text-green-600">
					История
				</Link>
			</div>
			<Link to="/user" className="flex gap-4 items-center hover:text-green-600">
				<div>{user.email}</div>
				<img src={user.imageUrl} alt="Аватар пользователя" className="w-1/5" />
			</Link>
		</div>
	);
};