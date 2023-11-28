import styles from './settings.page.module.css';
import { FC } from 'react';
import { AppSettings, Button, PageHeader, Spinner } from '@/components';
import { TSettingsPageProps } from '@/pages';
import { FormProvider } from 'react-hook-form';

const SettingsPage: FC<TSettingsPageProps> = ({
	title,
	subtitle,
	isPageLoading,
	onSubmit,
	methods,
	...settingsProps
}) => {
	const contentMarkup = isPageLoading ? (
		<Spinner />
	) : (
		<AppSettings {...settingsProps} />
	);

	return (
		<FormProvider {...methods}>
			<form
				className={styles.settingsPage}
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<div className={styles.settingsPageHeader}>
					<PageHeader {...{ title, subtitle }} />
				</div>
				<div className={styles.settingsPageBody}>{contentMarkup}</div>
				<div className={styles.settingsPageFooter}>
					<Button label="Save" type="submit" disabled={isPageLoading} />
				</div>
			</form>
		</FormProvider>
	);
};

export default SettingsPage;
