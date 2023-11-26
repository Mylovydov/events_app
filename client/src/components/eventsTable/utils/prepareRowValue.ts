import { TEventUnionKeys, TEventValue } from '@/components';
import { formatDate } from '@/utils';

const defaultValue = '——';

const prepareRowValue = (value: TEventValue, key: TEventUnionKeys) => {
	let rowValue: string;

	switch (key) {
		case 'startDateTime':
			rowValue = value ? formatDate(value) : defaultValue;
			break;
		case 'endDateTime':
			rowValue = value ? formatDate(value) : defaultValue;
			break;
		default:
			rowValue = value || defaultValue;
	}
	return rowValue;
};

export default prepareRowValue;
