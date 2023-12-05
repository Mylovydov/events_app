import { useNavigate } from 'react-router-dom';
import { useGetUser } from '@/hooks';
import { decodeUserToken, localStorageService } from '@/utils';
import { AppLayout } from '@/layouts';
import { useEffect } from 'react';
import { LOGIN_PATH } from '@/routes';

const AppContentContainer = () => {
	const navigate = useNavigate();
	const { user, isUserLoading } = useGetUser(
		decodeUserToken(localStorageService.getTokenFromLS())
	);

	useEffect(() => {
		if (!user && !isUserLoading) {
			navigate(LOGIN_PATH);
		}
	}, [user, isUserLoading, navigate]);

	return <AppLayout isAppLoading={isUserLoading} />;
};

export default AppContentContainer;
