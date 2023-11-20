import { TBaseSortDirection } from '@/components/baseTable/baseTable.types.ts';
import { TEventUnionKeys } from '@/components/eventsTable/components/eventsTableRow/eventsTableRow.types.ts';

export const SORT_DIRECTION_PARAM_KEY = 'direction';
export const SORT_KEY_PARAM_KEY = 'key';
export const PAGE_PARAM_KEY = 'page';

export const defaultDirection: TBaseSortDirection = 'desc';
export const defaultSortKey: TEventUnionKeys = 'startDateTime';
