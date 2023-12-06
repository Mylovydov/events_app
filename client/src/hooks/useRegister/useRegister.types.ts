import { TLogoutInput } from '@/services';

export type TUseLogoutReturn = {
	logout: (args: TLogoutInput) => void;
	isLoggingOut: boolean;
};
