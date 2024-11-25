import { forwardRef } from "react";

export const Input = forwardRef(({ children, ...props }, ref, ) => {	
	return (
		<label>
			<p>{children}</p>
			<input {...props} ref={ref} className="w-full h-10 px-4 my-3" />
		</label>
	);
});