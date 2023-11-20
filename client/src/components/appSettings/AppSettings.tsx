import styles from './appSettings.module.css';

import { FC } from 'react';

import { SettingsItem } from '@/components/appSettings/components';
import { TAppSettingsProps } from '@/components/appSettings/appSettings.types.ts';

const AppSettings: FC<TAppSettingsProps> = ({ items = [] }) => (
	<div className={styles.appSettings}>
		{items.map((item, i) => (
			<div className={styles.appSettingsItem} key={i}>
				<SettingsItem {...item} />
			</div>
		))}
	</div>
);

export default AppSettings;
