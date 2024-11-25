import { forwardRef } from 'react';

export const SelectValue = forwardRef(
	({ children, selectedList, categoryType, ...props }, ref) => {
		return (
			<>
				<p>{children}</p>
				<select className="w-full h-10 px-4 my-3" {...props} ref={ref}>
					{selectedList.map(({ id, title, type }) => (
						<option value={id} key={id}>
							{categoryType(type)}
							&nbsp;/&nbsp;
							{title}
						</option>
					))}
				</select>
			</>
		);
	},
);
