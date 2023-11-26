import { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { TUserContext } from '@/providers';
import { useGetUser } from '@/hooks';

export const UserContext = createContext<TUserContext>({
	user: null,
	isUserLoading: false
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user, isUserLoading } = useGetUser({
		userId: import.meta.env.VITE_USER_ID
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
