import { FC } from 'react';
import {
	BaseTable,
	EventsActions,
	Pagination,
	TEventsTableProps
} from '@/components';

import styles from './eventsTable.module.css';

const EventsTable: FC<TEventsTableProps> = ({
	rows,
	columns,
	onSortDirectionChange,
	isLoading,
	sortKey,
	sortDirection,
	isLastColumnSticky,
	emptyLabel,
	actionItems,
	...paginationProps
}) => {
	const eventActionsMarkup = !!actionItems.length && (
		<div className={styles.eventsTableHeader}>
			<EventsActions actionItems={actionItems} />
		</div>
	);

	return (
		<div className={styles.eventsTable}>
			{eventActionsMarkup}
			<div className={styles.eventsTableBody}>
				<BaseTable
					{...{
						rows,
						columns,
						onSortDirectionChange,
						isLoading,
						sortKey,
						sortDirection,
						isLastColumnSticky,
						emptyLabel
					}}
				/>
			</div>
			<div className={styles.eventsTableFooter}>
				<Pagination {...paginationProps} />
			</div>
		</div>
	);
};

export default EventsTable;
