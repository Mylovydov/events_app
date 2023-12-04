import { TUser } from '@/services';

export type TAppUserState = {
	user: TUser | null;
	isAppUserLoading: boolean;
	isAppUserAuth: boolean;
};

export type TSetAppUserPayload = {
	user: TAppUserState['user'];
	isUserAuth: TAppUserState['isAppUserAuth'];
};

export type TIsAppUserLoadingPayload = {
	isUserLoading: TAppUserState['isAppUserLoading'];
};
