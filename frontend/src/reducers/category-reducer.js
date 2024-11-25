import { ACTION_TYPE } from '../actions';

export const categoryReducer = (state = [], action) => {
	let newState = [];

	switch (action.type) {
		case ACTION_TYPE.LOAD_CATEGORIES:
			return [...state, ...action.payload];

		case ACTION_TYPE.ADD_CATEGORY:
			newState = [...state];
			newState.push(action.payload);
			return newState;

		case ACTION_TYPE.EDIT_CATEGORY:
			newState = [...state];

			newState.forEach((el, index) => {
				if (el.id === action.payload.id) {
					newState[index] = { ...action.payload };
				}
			});

			return newState;

		case ACTION_TYPE.REMOVE_CATEGORY:
			const currentState = [...state];
			newState = currentState.filter(({ id }) => id !== action.payload);
			return newState;

		case ACTION_TYPE.RESET_STATE:
			return [];

		default:
			return state;
	}
};
