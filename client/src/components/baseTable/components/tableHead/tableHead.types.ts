import {
	TSortDirection,
	TTableColumn
} from '@/components/baseTable/baseTable.types.ts';

export type TTableHeadProps = {
	columns: TTableColumn[];
	onSortDirectionChange: (
		accessor: string,
		sortDirection: TSortDirection
	) => void;
	sortKey?: string;
	sortDirection?: TSortDirection;
};
