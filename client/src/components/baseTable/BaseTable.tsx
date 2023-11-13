import styles from './baseTable.module.css';
import TableHead from './components/tableHead/TableHead.tsx';
import { FC, ReactNode } from 'react';
import { TTableColumn } from '@/components/baseTable/baseTable.types.ts';
import { ESortDirection } from '@/components/baseTable/components/sortableCell/sortableCell.types.ts';

export type TBaseTableProps = {
	tableData: ReactNode[];
	columns: TTableColumn[];
	onSortDirectionChange: (
		accessor: string,
		sortDirection: ESortDirection
	) => void;
	isLoading?: boolean;
	sortKey: string;
	sortDirection: ESortDirection;
};

const BaseTable: FC<TBaseTableProps> = ({
	tableData = [],
	isLoading,
	...tableHeadProps
}) => {
	return (
		<div className={styles.baseTableWrapper}>
			<div className={styles.baseTableContainer}>
				<table className={styles.baseTable}>
					<TableHead {...tableHeadProps} />
				</table>
			</div>
		</div>
	);
};

export default BaseTable;
