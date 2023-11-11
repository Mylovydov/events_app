import styles from './sidebar.module.css';
import AppLogo from '../appLogo/AppLogo.tsx';
import Navbar from '../navbar/Navbar.tsx';
import { FC } from 'react';
import { TSidebarProps } from '@/components/sidebar/sidebar.types.ts';
import Logout from '../logout/Logout.tsx';

const Sidebar: FC<TSidebarProps> = ({
	navList,
	logoutLabel,
	onLogoutClick
}) => (
	<div className={styles.sidebar}>
		<div className={styles.sidebarHeader}>
			<AppLogo />
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
