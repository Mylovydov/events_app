import styles from './app.layout.module.css';
import { Outlet } from 'react-router-dom';
import {
	EMAIL_LAYOUT_PATH,
	EVENTS_PATH,
	HOME_PATH,
	SETTINGS_PATH
} from '@/router/constants.ts';
import { Header, Sidebar } from '@/components';
import { TNavItemProps } from '@/components/navbar/components/navItem/navItem.types.ts';

const navList: TNavItemProps[] = [
	{ label: 'Home', to: HOME_PATH, icon: 'house' },
	{ label: 'Events', to: EVENTS_PATH, icon: 'calendar-days' },
	{ label: 'Settings', to: SETTINGS_PATH, icon: 'gear' },
	{ label: 'Layout', to: EMAIL_LAYOUT_PATH, icon: 'rectangle-list' }
];

const AppLayout = () => {
	return (
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
					<div className={styles.appContainer}>
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
