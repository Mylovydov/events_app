import { TUser } from '@/services';

export type TAppUserState = {
	appUser: TUser | null;
	isAppUserLoading: boolean;
	isAppUserAuth: boolean;
};

export type TSetAppUserPayload = {
	user: TAppUserState['appUser'];
	isUserAuth: TAppUserState['isAppUserAuth'];
};

export type TIsAppUserLoadingPayload = {
	isUserLoading: TAppUserState['isAppUserLoading'];
};
