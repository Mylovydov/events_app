import styles from './header.module.css';
import HeaderActions from '../headerActions/HeaderActions.tsx';
import images from '@/assets/images.jpeg';
import { FC } from 'react';
import { HeaderProps } from '@/components/header/header.types.ts';

const Header: FC<HeaderProps> = ({ username }) => {
	return (
		<div className={styles.header}>
			<div className={styles.headerMenu}>appHeaderMenu</div>
			<div className={styles.headerAction}>
				<HeaderActions userAvatar={images} username={username} />
			</div>
		</div>
	);
};

export default Header;
