import styles from './sidebar.module.css';
import { FC } from 'react';
import { AppLogo, Logout, Navbar, TSidebarProps } from '@/components';

const Sidebar: FC<TSidebarProps> = ({
	navList,
	logoutLabel = 'Logout',
	onLogoutClick
}) => (
	<div className={styles.sidebar}>
		<div className={styles.sidebarHeader}>
			<AppLogo logoText="Events App" />
		</div>
		<div className={styles.sidebarBody}>
			<Navbar items={navList} />
		</div>
		<div className={styles.sidebarFooter}>
			<Logout label={logoutLabel} onClick={onLogoutClick} />
		</div>
	</div>
);

export default Sidebar;
