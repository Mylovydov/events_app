import { TLoginInput } from '@/services';

export type TUseLoginReturn = {
	login: (args: TLoginInput) => void;
	isLogging: boolean;
};
