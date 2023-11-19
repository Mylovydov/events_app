import { FC } from 'react';
import { Cell } from '@/components/baseTable/components';
import styles from './eventsTableRow.module.css';
import {
	TEventKeys,
	TEventsTableRowProps
} from '@/components/eventsTable/components/eventsTableRow/eventsTableRow.types.ts';
import prepareRowValue from '../../utils/prepareRowValue.ts';
import { Button } from '@/components';

const EventsTableRow: FC<TEventsTableRowProps> = ({
	columns,
	item,
	actionBtnLabel
}) => {
	const rowsKeys = columns.map(c => c.accessor);

	const tableRowsMarkup = (rowsKeys as TEventKeys).map(key => {
		const rowValue = prepareRowValue(item[key], key);
		return (
			<Cell isHead={false} className={styles.eventsTableCell} key={key}>
				{rowValue || '——'}
			</Cell>
		);
	});

	tableRowsMarkup.push(
		<Cell isHead={false} key="action" className={styles.eventsTableCell}>
			<Button label={actionBtnLabel} />
		</Cell>
	);
	return <tr className={styles.eventsTableRow}>{tableRowsMarkup}</tr>;
};

export default EventsTableRow;
