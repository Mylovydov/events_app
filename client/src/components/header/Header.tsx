import styles from './header.module.css';
import images from '@/assets/images.jpeg';
import { FC } from 'react';
import { HeaderActions, HeaderProps } from '@/components';

const Header: FC<HeaderProps> = ({ username }) => (
	<div className={styles.header}>
		<div className={styles.headerAction}>
			<HeaderActions userAvatar={images} username={username} />
		</div>
	</div>
);

export default Header;
