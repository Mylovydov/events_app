import styles from './baseTable.module.css';
import { FC, ReactNode } from 'react';
import { TTableColumn } from '@/components/baseTable/baseTable.types.ts';
import { TableHead } from '@/components/baseTable/components';

export type TSortDirection = 'asc' | 'desc';

export type TBaseTableProps = {
	rows?: ReactNode[];
	columns: TTableColumn[];
	onSortDirectionChange: (
		accessor: string,
		sortDirection: TSortDirection
	) => void;
	isLoading?: boolean;
	sortKey: string;
	sortDirection: TSortDirection;
};

const BaseTable: FC<TBaseTableProps> = ({
	rows = [],
	isLoading,
	...tableHeadProps
}) => {
	return (
		<div className={styles.baseTableWrapper}>
			<div className={styles.baseTableContainer}>
				<table className={styles.baseTable}>
					<TableHead {...tableHeadProps} />
					<tbody>{rows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default BaseTable;
