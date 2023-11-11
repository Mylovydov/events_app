import styles from './appHeader.module.css';
import HeaderActions from '../headerActions/HeaderActions.tsx';
import images from '@/assets/images.jpeg';
import { FC } from 'react';
import { AppHeaderProps } from '@/components/appHeader/appHeader.types.ts';

const AppHeader: FC<AppHeaderProps> = ({ username }) => {
	return (
		<div className={styles.appHeader}>
			<div className={styles.appHeaderMenu}>appHeaderMenu</div>
			<div className={styles.appHeaderAction}>
				<HeaderActions userAvatar={images} username={username} />
			</div>
		</div>
	);
};

export default AppHeader;
