import { ACTION_TYPE } from '../actions';

const userInitialState = {
	email: '',
	imageUrl: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return { ...state, ...action.payload };

		case ACTION_TYPE.EDIT_USER:
			return { ...action.payload };

		case ACTION_TYPE.RESET_STATE:
			return userInitialState;

		default:
			return state;
	}
};
