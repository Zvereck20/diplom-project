import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { userReducer, categoryReducer, invoiceReducer } from './reducers';

// Функция для сохранения состояния в localStorage
const saveToLocalStorage = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('reduxState', serializedState);
	} catch (e) {
		console.error('Could not save state', e);
	}
};

// Функция для загрузки состояния из localStorage
const loadFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('reduxState');
		return serializedState ? JSON.parse(serializedState) : undefined;
	} catch (e) {
		console.error('Could not load state', e);
		return undefined;
	}
};

const reducers = combineReducers({
	user: userReducer,
	category: categoryReducer,
	invoice: invoiceReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducers,
	loadFromLocalStorage(),
	composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => {
	saveToLocalStorage(store.getState());
});
