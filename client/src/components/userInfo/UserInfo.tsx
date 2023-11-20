import styles from './userInfo.module.css';
import { Avatar, TUserInfoProps, Typography } from '@/components';
import { FC } from 'react';

const UserInfo: FC<TUserInfoProps> = ({ name = 'John Doe', src }) => (
	<div className={styles.userInfo}>
		<div className={styles.userInfoAvatar}>
			<Avatar src={src} name={name} />
		</div>
		<div className={styles.userInfoText}>
			<Typography text={name} variant="subtitle1" weight="semi" noWrap />
		</div>
	</div>
);

export default UserInfo;
