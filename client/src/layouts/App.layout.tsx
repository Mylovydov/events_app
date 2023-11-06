import styles from './app.layout.module.css';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/appHeader/AppHeader.tsx';

const AppLayout = () => {
	return (
		<div className={styles.app}>
			<div className={styles.appSidebar}></div>
			<div className={styles.appMain}>
				<div className={styles.appHeader}>
					<AppHeader />
				</div>
				<div className={styles.appBody}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
