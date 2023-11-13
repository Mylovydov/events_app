import { ESortDirection } from '@/components/baseTable/components/sortableCell/sortableCell.types.ts';
import { TTableColumn } from '@/components/baseTable/baseTable.types.ts';

export type TTableHeadProps = {
	columns: TTableColumn[];
	onSortDirectionChange: (
		accessor: string,
		sortDirection: ESortDirection
	) => void;
	sortKey: string;
	sortDirection: ESortDirection;
};
