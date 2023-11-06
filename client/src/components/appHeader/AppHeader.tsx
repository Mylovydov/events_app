import styles from './appHeader.module.css';
import images from '@/assets/images.jpeg';
import { Avatar } from '@/components/ui';
import Typography from '../ui/typography/Typography.tsx';

const AppHeader = () => {
	return (
		<div className={styles.appHeader}>
			<div className={styles.appHeaderMenu}>appHeaderMenu</div>
			<div className={styles.appHeaderAction}>
				<Avatar src={images} />
				<Typography variant="body1" text="fsfsfsf" weight="regular" />
			</div>
		</div>
	);
};

export default AppHeader;
