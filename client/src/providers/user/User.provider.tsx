import { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { TUserContext } from '@/providers';
import { useGetUser } from '@/hooks';

export const UserContext = createContext<TUserContext>({
	user: null,
	isUserLoading: false
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user, isUserLoading } = useGetUser({
		userId: '180aab9e-a0ed-49a9-b452-65c74bc586ad'
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
