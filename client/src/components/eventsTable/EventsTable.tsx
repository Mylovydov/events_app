import { FC } from 'react';
import { BaseTable, Pagination, TPaginationProps } from '@/components';
import { TBaseTableProps } from '@/components/baseTable/baseTable.types.ts';

import styles from './eventsTable.module.css';

export type TEventsTableProps = TBaseTableProps & TPaginationProps;

const EventsTable: FC<TEventsTableProps> = ({
	rows,
	columns,
	onSortDirectionChange,
	isLoading,
	sortKey,
	sortDirection,
	isLastColumnSticky,
	emptyLabel,
	...paginationProps
}) => {
	return (
		<div className={styles.eventsTable}>
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
					isLastColumnSticky={true}
				/>
			</div>
			<div className={styles.eventsTableFooter}>
				<Pagination {...paginationProps} />
			</div>
		</div>
	);
};

export default EventsTable;
