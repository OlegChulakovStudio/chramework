export const required = value => (value ? undefined : 'Обязательное поле');

export const numeric = value =>
	isNaN(value) ? 'Должно быть числом' : undefined;

export const lengthEqual = length => value => {
	return value && value.length === length
		? undefined
		: `Должен содержать ${length} цифр(-ы)`;
};
export const maxLength = length => value => {
	return value && value.length <= length
		? undefined
		: `Максимальное количество символов ${length}`;
};

export const date = value =>
	/(^\d{2}\.\d{2}\.\d{4}$)/.test(value) ? undefined : 'Введите корректную дату';

export const phone = value =>
	// eslint-disable-next-line no-useless-escape
	/(?:\+|\d)[\d\-\(\) ]{8,}/g.test(value)
		? undefined
		: 'Введите корректный номер телефона';

export const cardDate = value =>
	/^(0[1-9]|1[0-2]) \/ ?([0-9]{4}|[0-9]{2})$/.test(value)
		? undefined
		: 'Введите корректную дату';

export const month = value =>
	value > 0 && value <= 12 ? undefined : 'Введите корректную дату';

export const email = value =>
	value &&
	// eslint-disable-next-line no-useless-escape
	!/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/i.test(
		value
	)
		? 'Некорректный email'
		: undefined;
