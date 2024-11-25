import { CATEGORY_TYPE } from '../constants';

export const getCategoryType = (type) => {
	switch (type) {
		case CATEGORY_TYPE.EXPENSE:
			return 'Расход';
		case CATEGORY_TYPE.INCOME:
			return 'Доход';
		default:
		//Null
	}
};
