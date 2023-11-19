import { TSortDirection } from '@/components/baseTable/baseTable.types.ts';

export type TUseSortTableParams = {
	sortKeyName: string;
	sortDirectionKeyName: string;
};

export type TSetSortParams = {
	sortKeyValue: string;
	sortDirectionValue: TSortDirection;
};
