import { ReactNode } from 'react';

export type TTableColumn = {
	label: string;
	accessor: string;
	sortable?: boolean;
};

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
	isLastColumnSticky?: boolean;
	emptyLabel?: string;
};
