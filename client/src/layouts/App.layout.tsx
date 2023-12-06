import styles from './app.layout.module.css';
import { Outlet } from 'react-router-dom';
import {
	EMAIL_LAYOUT_PATH,
	EVENTS_PATH,
	HOME_PATH,
	SETTINGS_PATH
} from '@/routes/constants.ts';
import {
	AppContainer,
	Header,
	Sidebar,
	Spinner,
	TNavItemProps
} from '@/components';
import { FC } from 'react';

const navList: TNavItemProps[] = [
	{ label: 'Home', to: HOME_PATH, icon: 'house' },
	{ label: 'Events', to: EVENTS_PATH, icon: 'calendar-days' },
	{ label: 'Settings', to: SETTINGS_PATH, icon: 'gear' },
	{ label: 'Layout', to: EMAIL_LAYOUT_PATH, icon: 'rectangle-list' }
];

export type TAppLayoutProps = {
	isAppLoading?: boolean;
};

const AppLayout: FC<TAppLayoutProps> = ({ isAppLoading }) => {
	const appContentMarkup = isAppLoading ? (
		<Spinner />
	) : (
		<div className={styles.app}>
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
		</div>
	);

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{appContentMarkup}
		</div>
	);
};

export default AppLayout;
