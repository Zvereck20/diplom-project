import { ACTION_TYPE } from '../actions';
import { store } from '../store';

export const clearState = () => {
	localStorage.removeItem('reduxState');

	store.dispatch({ type: ACTION_TYPE.RESET_STATE });
};
