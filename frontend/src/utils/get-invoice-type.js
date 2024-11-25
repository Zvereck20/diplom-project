import { INVOICE_TYPE } from '../constants';

export const getInvoiceType = (type) => {
	switch (type) {
		case INVOICE_TYPE.CONTRIBUTION:
			return 'Вклад';
		case INVOICE_TYPE.CASH:
			return 'Наличные деньги';
		case INVOICE_TYPE.DEBIT_CARD:
			return 'Дебитовая карта';
		case INVOICE_TYPE.CREDIT_CARD:
			return 'Кредитная карта';
		default:
		//Null
	}
};
