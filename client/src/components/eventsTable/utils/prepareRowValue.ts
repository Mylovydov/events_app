import {
	TEventUnionKeys,
	TEventValue
} from '@/components/eventsTable/components/eventsTableRow/eventsTableRow.types.ts';
import formatDate from '../../../utils/helpers/formatDate.ts';

const defaultValue = '——';

const prepareRowValue = (value: TEventValue, key: TEventUnionKeys) => {
	let rowValue;

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
