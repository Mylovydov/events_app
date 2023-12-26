import { FC } from 'react';
import styles from './eventsTableRow.module.css';
import {
	Button,
	Cell,
	prepareRowValue,
	TEventKeys,
	TEventsTableRowProps
} from '@/components';
import { isColorDark } from '@/utils';

const EventsTableRow: FC<TEventsTableRowProps> = ({
	columns,
	item,
	actionBtnLabel,
	highlightColor,
	onSendButtonClick,
	isInvitationSending
}) => {
	const rowsKeys = columns.map(c => c.accessor);
	const rowStyle = {
		backgroundColor: highlightColor || '',
		color: isColorDark(highlightColor) ? '#fff' : '#0C1E36'
	};

	const style = item.isEmailSend ? {} : rowStyle;

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
			<Button
				label={actionBtnLabel}
				onClick={() => onSendButtonClick(item._id)}
				disabled={isInvitationSending}
			/>
		</Cell>
	);
	return <tr className={styles.eventsTableRow}>{tableRowsMarkup}</tr>;
};

export default EventsTableRow;
