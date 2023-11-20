import styles from './settings.page.module.css';
import { FC } from 'react';
import { AppSettings, Button, PageHeader } from '@/components';
import { TSettingsPageProps } from '@/pages';

const SettingsPage: FC<TSettingsPageProps> = ({
	title,
	subtitle,
	...settingsProps
}) => {
	return (
		<section className={styles.settingsPage}>
			<div className={styles.settingsPageHeader}>
				<PageHeader {...{ title, subtitle }} />
			</div>
			<div className={styles.settingsPageBody}>
				<AppSettings {...settingsProps} />
			</div>
			<div className={styles.settingsPageFooter}>
				<Button label="Save" />
			</div>
		</section>
	);
};

export default SettingsPage;
