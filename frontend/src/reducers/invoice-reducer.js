import { ACTION_TYPE } from '../actions';

export const invoiceReducer = (state = [], action) => {
	let newState = [];

	switch (action.type) {
		case ACTION_TYPE.LOAD_INVOICES:
			return [...state, ...action.payload];

		case ACTION_TYPE.ADD_INVOICE:
			newState = [...state];
			newState.push(action.payload);
			return newState;

		case ACTION_TYPE.EDIT_INVOICE:
			newState = [...state];

			newState.forEach((el, index) => {
				if (el.id === action.payload.id) {
					newState[index] = { ...action.payload };
				}
			});

			return newState;

		case ACTION_TYPE.REMOVE_INVOICE:
			const currentState = [...state];
			newState = currentState.filter(({ id }) => id !== action.payload);
			return newState;

		case ACTION_TYPE.RESET_STATE:
			return [];

		default:
			return state;
	}
};
