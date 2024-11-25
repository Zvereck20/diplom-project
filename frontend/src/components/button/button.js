export const Button = ({ color = 'bg-green-400', disabled, children, ...props }) => {
	if (disabled) {
		color = 'bg-blue-300'
	}
	
	return (
		<button className={`p-2 shadow-inner w-full my-3 ${color}`} disabled={disabled} {...props}>
			{children}
		</button>
	);
};
