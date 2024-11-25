import { Route, Routes, useMatch } from 'react-router-dom';
import { Authorization, Registration, Main, Category, Invoice, Operation, User } from './pages';
import { Header } from './components';

export const App = () => {
	const isLogin = !!useMatch('/');
	const isRegister = !!useMatch('/register');

	return (
		<div className="h-full w-full bg-gray-300 flex flex-col">
			{isLogin || isRegister ? null : <Header />}

			<Routes>
				<Route path="/" element={<Authorization />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/main" element={<Main />} />
				<Route path="/category" element={<Category />} />
				<Route path="/category/add" element={<Category />} />
				<Route path="/category/:id" element={<Category />} />
				<Route path="/invoice" element={<Invoice />} />
				<Route path="/invoice/add" element={<Invoice />} />
				<Route path="/invoice/:id" element={<Invoice />} />
				<Route path="/operation" element={<Operation />} />
				<Route path="/operation/add" element={<Operation />} />
				<Route path="/operation/:id" element={<Operation />} />
				<Route path="/user" element={<User />} />
			</Routes>
		</div>
	);
};
