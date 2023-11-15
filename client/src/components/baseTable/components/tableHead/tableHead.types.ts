import { TTableColumn } from '@/components/baseTable/baseTable.types.ts';
import { TSortDirection } from '@/components/baseTable/BaseTable.tsx';

export type TTableHeadProps = {
	columns: TTableColumn[];
	onSortDirectionChange: (
		accessor: string,
		sortDirection: TSortDirection
	) => void;
	sortKey: string;
	sortDirection: TSortDirection;
};
