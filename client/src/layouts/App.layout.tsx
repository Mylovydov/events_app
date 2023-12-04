import styles from './app.layout.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import {
	EMAIL_LAYOUT_PATH,
	EVENTS_PATH,
	HOME_PATH,
	LOGIN_PATH,
	SETTINGS_PATH
} from '@/routes/constants.ts';
import {
	AppContainer,
	Header,
	Sidebar,
	Spinner,
	TNavItemProps
} from '@/components';
import { useGetUser } from '@/hooks';
import { localStorageService } from '@/utils';
import { jwtDecode } from 'jwt-decode';

const navList: TNavItemProps[] = [
	{ label: 'Home', to: HOME_PATH, icon: 'house' },
	{ label: 'Events', to: EVENTS_PATH, icon: 'calendar-days' },
	{ label: 'Settings', to: SETTINGS_PATH, icon: 'gear' },
	{ label: 'Layout', to: EMAIL_LAYOUT_PATH, icon: 'rectangle-list' }
];

const decodeUserToken = (token: string | null) => {
	if (token) {
		const decodedToken = jwtDecode<{ userId: string }>(token);
		return decodedToken.userId;
	}
	return null;
};

const AppLayout = () => {
	const navigate = useNavigate();
	const { user, isUserLoading } = useGetUser(
		decodeUserToken(localStorageService.getTokenFromLS())
	);

	if (!user && !isUserLoading) {
		navigate(LOGIN_PATH);
	}

	const contentMarkup = isUserLoading ? (
		<Spinner />
	) : (
		<>
			<aside className={styles.appSidebar}>
				<Sidebar
					navList={navList}
					logoutLabel="Logout"
					onLogoutClick={() => {}}
				/>
			</aside>
			<div className={styles.appMain}>
				<header className={styles.appHeader}>
					<Header username="Denys" />
				</header>
				<main className={styles.appBody}>
					<AppContainer>
						<Outlet />
					</AppContainer>
				</main>
			</div>
		</>
	);

	return <div className={styles.app}>{contentMarkup}</div>;
};

export default AppLayout;
