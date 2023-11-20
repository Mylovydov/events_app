import styles from './settings.page.module.css';
import { FC } from 'react';
import { TSettingsPageProps } from '@/pages/settings/settings.page.types.ts';
import { AppSettings, Button, PageHeader } from '@/components';

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
