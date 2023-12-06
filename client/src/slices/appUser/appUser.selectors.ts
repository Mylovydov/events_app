import { RootState } from '@/store';

export const getUserSelector = ({ appUser }: RootState) => ({
	user: appUser.user,
	isAppUserLoading: appUser.isAppUserLoading,
	isAppUserAuth: appUser.isAppUserAuth
});
