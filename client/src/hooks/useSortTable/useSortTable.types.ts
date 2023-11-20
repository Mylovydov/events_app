import { TBaseSortDirection } from '@/components/baseTable/baseTable.types.ts';
import { TEventUnionKeys } from '@/components/eventsTable/components/eventsTableRow/eventsTableRow.types.ts';

export type TUseSortTableParams = {
	sortKeyName: string;
	defaultSortKey: TEventUnionKeys;
	sortDirectionKeyName: string;
	defaultDirection: TBaseSortDirection;
	pageParamKey: string;
	resetPageAfterSort: boolean;
};

export type TSetSortParams = {
	sortKeyValue: string;
	sortDirectionValue: TBaseSortDirection;
};
