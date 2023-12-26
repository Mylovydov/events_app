import {
	TBaseTableProps,
	TEventsActionsProps,
	TPaginationProps
} from '@/components';

export type TEventsTableProps = TBaseTableProps &
	TPaginationProps &
	TEventsActionsProps;
