import styles from './appLogo.module.css';
import Logo from '@/assets/logo/logo.svg?react';
import { Typography } from '@/components';

const AppLogo = () => (
	<div className={styles.logo}>
		<div className={styles.logoImg}>
			<Logo fontSize="6rem" />
		</div>
		<div className={styles.logoText}>
			<Typography text="Events App" weight="medium" variant="h6" lightColor />
		</div>
	</div>
);

export default AppLogo;
