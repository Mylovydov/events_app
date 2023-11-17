import { TSortDirection } from '@/components/baseTable/baseTable.types.ts';

export type TSetSortParams = {
	sortKeyName: string;
	sortKeyValue: string;
	sortDirectionKeyName: string;
	sortDirectionValue: TSortDirection;
};
