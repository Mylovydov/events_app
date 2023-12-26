import { TRegisterInput } from '@/services';

export type TUseRegisterReturn = {
	register: (args: TRegisterInput) => void;
	isRegistering: boolean;
};
