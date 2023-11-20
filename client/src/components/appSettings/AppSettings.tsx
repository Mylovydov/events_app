import styles from './appSettings.module.css';
import SettingsItem, {
	TSettingsItemProps
} from './components/SettingsItem.tsx';
import { FC } from 'react';

export type TAppSettingsProps = {
	items: TSettingsItemProps[];
};

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
