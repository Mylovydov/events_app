import styles from './emailSettingsForm.module.css';
import { FC } from 'react';
import { TEmailSettingsFormProps, TextField } from '@/components';

const EmailSettingsForm: FC<TEmailSettingsFormProps> = () => {
	return (
		<form className={styles.emailSettingsForm} noValidate>
			<div className={styles.emailSettingsFormBody}>
				<div className={styles.emailSettingsFormItem}>
					<TextField
						labelProps={{
							label: 'Service'
						}}
						disabled
						value="Gmail"
					/>
				</div>
				<div className={styles.emailSettingsFormItem}>
					<TextField
						labelProps={{
							label: 'Password',
							required: true
						}}
					/>
				</div>
				<div className={styles.emailSettingsFormItem}>
					<TextField
						labelProps={{
							label: 'User',
							required: true
						}}
					/>
				</div>
			</div>
			<div className={styles.emailSettingsFormFooter}></div>
		</form>
	);
};

export default EmailSettingsForm;
