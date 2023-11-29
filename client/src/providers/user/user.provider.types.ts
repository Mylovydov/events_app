import { TUser } from '@/services';

export type TUserContext = {
	user: TUser | null;
	isUserLoading: boolean;
};
