import styles from './app.layout.module.css';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
	return (
		<div className={styles.app}>
			<div className={styles.appSidebar}></div>
			<div className={styles.appMain}>
				<div className={styles.appHeader}>appHeader</div>
				<div className={styles.appBody}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
