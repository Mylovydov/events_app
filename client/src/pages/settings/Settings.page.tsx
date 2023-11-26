import styles from './settings.page.module.css';
import { FC } from 'react';
import { AppSettings, Button, PageHeader, Spinner } from '@/components';
import { TSettingsPageProps } from '@/pages';

const SettingsPage: FC<TSettingsPageProps> = ({
	title,
	subtitle,
	isPageLoading,
	onSave,
	disableSaveButton,
	...settingsProps
}) => {
	const contentMarkup = isPageLoading ? (
		<Spinner />
	) : (
		<AppSettings {...settingsProps} />
	);

	return (
		<section className={styles.settingsPage}>
			<div className={styles.settingsPageHeader}>
				<PageHeader {...{ title, subtitle }} />
			</div>
			<div className={styles.settingsPageBody}>{contentMarkup}</div>
			<div className={styles.settingsPageFooter}>
				<Button
					label="Save"
					onClick={onSave}
					disabled={isPageLoading || disableSaveButton}
				/>
			</div>
		</section>
	);
};

export default SettingsPage;
