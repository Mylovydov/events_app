import { TBaseSortDirection, TEventUnionKeys } from '@/components';

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
