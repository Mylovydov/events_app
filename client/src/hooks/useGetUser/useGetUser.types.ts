import { TUser } from '@/services';

export type TUseGetUserReturn = {
	user?: TUser;
	isUserLoading: boolean;
};
