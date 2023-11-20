import { TBaseSortDirection, TTableColumn } from '@/components';

export type TTableHeadProps = {
	columns: TTableColumn[];
	onSortDirectionChange: (
		accessor: string,
		sortDirection: TBaseSortDirection
	) => void;
	sortKey?: string;
	sortDirection?: TBaseSortDirection;
};
