import styles from './app.layout.module.css';
import { Outlet } from 'react-router-dom';
import { AppContainer, Header, Sidebar } from '@/components';
import { FC } from 'react';
import { TAppLayoutProps } from '@/layouts';

const AppLayout: FC<TAppLayoutProps> = ({
	navList,
	username,
	logoutLabel,
	onLogoutClick
}) => (
	<div className={styles.appWrapper}>
		<div className={styles.app}>
			<aside className={styles.appSidebar}>
				<Sidebar
					navList={navList}
					logoutLabel={logoutLabel}
					onLogoutClick={onLogoutClick}
				/>
			</aside>
			<div className={styles.appMain}>
				<header className={styles.appHeader}>
					<Header username={username} />
				</header>
				<main className={styles.appBody}>
					<AppContainer>
						<Outlet />
					</AppContainer>
				</main>
			</div>
		</div>
	</div>
);
export default AppLayout;
