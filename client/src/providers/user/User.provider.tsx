import { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { TUserContext } from '@/providers';
import { useGetUser } from '@/hooks';

export const UserContext = createContext<TUserContext>({
	user: null,
	isUserLoading: false
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user, isUserLoading } = useGetUser({
		userId: 'd45cd472-9bf2-4ebf-8e8b-542045367721'
	});

	const value: TUserContext = useMemo(
		() => ({
			user,
			isUserLoading
		}),
		[user, isUserLoading]
	);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
