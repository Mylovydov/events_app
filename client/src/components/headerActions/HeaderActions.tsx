import styles from './headerActions.module.css';
import UserInfo from '../userInfo/UserInfo.tsx';
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { THeaderActionsProps } from '@/components';

const HeaderActions: FC<THeaderActionsProps> = ({ username, userAvatar }) => (
	<div className={styles.headerActions}>
		<div className={styles.headerActionsInfo}>
			<UserInfo name={username} src={userAvatar} />
		</div>
		<div className={styles.headerActionsNotify}>
			<FontAwesomeIcon icon="bell" fontSize="2rem" />
		</div>
	</div>
);

export default HeaderActions;
