import { SORT_CAREGORY } from '../constants';

export const getSortCategory = (category) => {
	switch (category) {
		case SORT_CAREGORY.CREATED:
			return 'Дата';

		case SORT_CAREGORY.COMMENT:
			return 'Комментарий';

		case SORT_CAREGORY.AMOUNT:
			return 'Сумма';

		case SORT_CAREGORY.INVOICE:
			return 'Счет';

		case SORT_CAREGORY.CATEGORY:
			return 'Категоря';

		default:
      // Somthing
			break;
	}
};
