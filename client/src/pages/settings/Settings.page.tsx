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
	isBtnDisabled,
	onReset,
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
					<Button label="Save" type="submit" disabled={isBtnDisabled} />
					<Button
						label="Reset"
						type="button"
						variant="outlined"
						onClick={onReset}
						disabled={isBtnDisabled}
					/>
				</div>
			</form>
		</FormProvider>
	);
};

export default SettingsPage;
