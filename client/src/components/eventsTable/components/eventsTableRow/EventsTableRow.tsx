import { FC } from 'react';
import { Cell } from '@/components/baseTable/components';
import styles from './eventsTableRow.module.css';
import {
	TEventKeys,
	TEventsTableRowProps
} from '@/components/eventsTable/components/eventsTableRow/eventsTableRow.types.ts';
import prepareRowValue from '../../utils/prepareRowValue.ts';

const EventsTableRow: FC<TEventsTableRowProps> = ({ columns, item }) => {
	const rowsKeys = columns.map(c => c.accessor);

	const tableRowsMarkup = (rowsKeys as TEventKeys).map(key => {
		const rowValue = prepareRowValue(item[key], key);
		return (
			<Cell isHead={false} className={styles.eventsTableCell} key={key}>
				{rowValue || '——'}
			</Cell>
		);
	});
	return <tr className={styles.eventsTableRow}>{tableRowsMarkup}</tr>;
};

export default EventsTableRow;
