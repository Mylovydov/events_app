import { TEvent, TGetEventsOutput } from '@/services';

export type TUseGetEventsReturn = {
	events: TEvent[];
	total: TGetEventsOutput['data']['total'];
	skip: TGetEventsOutput['data']['skip'];
	limit: TGetEventsOutput['data']['limit'];
	pageCount: TGetEventsOutput['data']['pageCount'];
	isEventsLoading: boolean;
};
