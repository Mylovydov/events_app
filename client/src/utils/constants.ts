import { TBaseSortDirection, TEventUnionKeys } from '@/components';

export enum EApiTags {
	USERS = 'Users',
	EVENTS = 'Events',
	EMAIL_SETTINGS = 'EmailSettings',
	LIST = 'List'
}

export const USERS_API_TAG = 'Users';
export const EVENTS_API_TAG = 'Events';
export const SORT_DIRECTION_PARAM_KEY = 'direction';
export const SORT_KEY_PARAM_KEY = 'key';
export const PAGE_PARAM_KEY = 'page';

export const defaultDirection: TBaseSortDirection = 'desc';
export const defaultSortKey: TEventUnionKeys = 'startDateTime';

export const defaultHighlightColor = '#ebe8ff';
