import styles from './appLogo.module.css';
import { Logo, TAppLogoProps, Typography } from '@/components';
import { FC } from 'react';

const AppLogo: FC<TAppLogoProps> = ({ logoText }) => (
	<div className={styles.appLogo}>
		<div className={styles.appLogoImg}>
			<Logo />
		</div>
		<div className={styles.appLogoText}>
			<Typography text={logoText} weight="medium" variant="h6" lightColor />
		</div>
	</div>
);

export default AppLogo;
