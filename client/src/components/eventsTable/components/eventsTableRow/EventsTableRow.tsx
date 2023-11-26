import { FC } from 'react';
import { Cell } from '@/components/baseTable/components';
import styles from './eventsTableRow.module.css';
import {
	Button,
	prepareRowValue,
	TEventKeys,
	TEventsTableRowProps
} from '@/components';
import isColorDark from '../../../../utils/helpers/isColorDark.ts';

const EventsTableRow: FC<TEventsTableRowProps> = ({
	columns,
	item,
	actionBtnLabel,
	highlightColor
}) => {
	const rowsKeys = columns.map(c => c.accessor);
	const style = {
		backgroundColor: highlightColor,
		color: isColorDark(highlightColor) ? '#fff' : '#0C1E36'
	};

	const tableRowsMarkup = (rowsKeys as TEventKeys).map(key => {
		const rowValue = prepareRowValue(item[key], key);

		return (
			<Cell
				style={style}
				isHead={false}
				className={styles.eventsTableCell}
				key={key}
			>
				{rowValue || '——'}
			</Cell>
		);
	});

	tableRowsMarkup.push(
		<Cell
			style={style}
			isHead={false}
			key="action"
			className={styles.eventsTableCell}
		>
			<Button label={actionBtnLabel} />
		</Cell>
	);
	return <tr className={styles.eventsTableRow}>{tableRowsMarkup}</tr>;
};

export default EventsTableRow;
