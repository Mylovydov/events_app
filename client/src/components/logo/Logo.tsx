import styles from './logo.module.css';
import LogoImg from '@/assets/logo/logo.svg?react';

const Logo = () => (
	<div className={styles.logo}>
		<LogoImg />
	</div>
);

export default Logo;
