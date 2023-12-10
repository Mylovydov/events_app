import { TCreateEventsInput } from '@/services';

export type TUseCreateEventsReturn = {
	uploadEvents: (arg: TCreateEventsInput) => void;
	isEventsCreating: boolean;
};
