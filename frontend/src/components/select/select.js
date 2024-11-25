import { forwardRef } from 'react';

export const Select = forwardRef(
	({ children, selectedList, type, getType, ...props }, ref) => {
		return (
			<>
				<p>{children}</p>
				<select className="w-full h-10 px-4 my-3" {...props} ref={ref}>
					{selectedList.map((item) => (
						<option value={type[item]} key={item}>
							{getType(type[item])}
						</option>
					))}
				</select>
			</>
		);
	},
);
