import { ReactNode } from 'react';

export type TTableColumn = {
	label: string;
	accessor: string;
	sortable?: boolean;
};

export type TBaseSortDirection = 'asc' | 'desc';

export type TBaseTableProps = {
	rows?: ReactNode[];
	columns: TTableColumn[];
	onSortDirectionChange: (
		accessor: string,
		sortDirection: TBaseSortDirection
	) => void;
	isLoading?: boolean;
	sortKey?: string;
	sortDirection?: TBaseSortDirection;
	isLastColumnSticky?: boolean;
	emptyLabel?: string;
};
