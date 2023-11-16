import { TEvent } from '@/services';

export type TUseGetEventsReturn = {
	events: TEvent[];
	isEventsLoading: boolean;
};
