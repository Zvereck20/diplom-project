export const Notification = ({ children, status = 'error' }) => {
	let style = 'w-full absolute -top-0 -left-0 p-4 p-4 border-black ';

	switch (status) {
		case 'error':
			style = style + 'bg-red-500';
			break;

		case 'message':
			style = style + 'bg-green-500';
			break;

		default:
			return style;
	}

	return (
		<div className={style}>
			<h3 className="text-3xl text-white">{children}</h3>
		</div>
	);
};
