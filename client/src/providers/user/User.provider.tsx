import {
	createContext,
	FC,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState
} from 'react';
import { TUserContext } from '@/providers';
import { useGetUser } from '@/hooks';
import { TUser } from '@/services';

export const UserContext = createContext<TUserContext>({
	user: null,
	isUserLoading: false,
	clearUser: () => {}
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	const [appUser, setAppUser] = useState<TUser | null>(null);

	const { user, isUserLoading } = useGetUser({
		userId: import.meta.env.VITE_USER_ID
	});

	useEffect(() => {
		user && setAppUser(user);
	}, [user]);

	const clearUser = useCallback(() => setAppUser(null), []);

	const value = useMemo(
		(): TUserContext => ({ user: appUser, isUserLoading, clearUser }),
		[appUser, isUserLoading, clearUser]
	);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
