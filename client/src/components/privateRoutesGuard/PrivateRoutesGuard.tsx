import { Navigate, useLocation } from 'react-router-dom';
import { useGetUser } from '@/hooks';
import { decodeUserToken, localStorageService } from '@/utils';
import { AppLayout } from '@/layouts';
import { Spinner } from '@/components';
import { PropsWithChildren } from 'react';
import { LOGIN_PATH } from '@/routes';

const Wrapper = ({ children }: PropsWithChildren) => {
	return (
		<div
			style={{
				width: '100wv',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{children}
		</div>
	);
};

const PrivateRoutesGuard = () => {
	const location = useLocation();
	const { user, isUserLoading } = useGetUser(
		decodeUserToken(localStorageService.getTokenFromLS())
	);

	if (isUserLoading) {
		return (
			<Wrapper>
				<Spinner />
			</Wrapper>
		);
	}

	return user ? (
		<AppLayout isAppLoading={isUserLoading} />
	) : (
		<Navigate to={LOGIN_PATH} replace state={{ from: location }} />
	);
};

export default PrivateRoutesGuard;
