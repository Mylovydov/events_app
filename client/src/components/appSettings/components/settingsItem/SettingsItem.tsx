import styles from './settingsItem.module.css';
import { TSettingsItemProps, Typography } from '@/components';
import { FC } from 'react';

const SettingsItem: FC<TSettingsItemProps> = ({
	title,
	subtitle,
	children
}) => {
	return (
		<div className={styles.settingsItem}>
			<div className={styles.settingsItemContent}>
				<Typography text={title} variant="h6" weight="semi" />
				{subtitle && <Typography text={subtitle} variant="subtitle2" />}
			</div>
			<div className={styles.settingsItemBody}>{children}</div>
		</div>
	);
};

export default SettingsItem;
