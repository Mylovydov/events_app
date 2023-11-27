import styles from './emailSettingsForm.module.css';
import { FC } from 'react';
import { TEmailSettingsFormProps, TextField } from '@/components';
import { useFormContext } from 'react-hook-form';

const EmailSettingsForm: FC<TEmailSettingsFormProps> = () => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<div className={styles.emailSettingsForm}>
			<div className={styles.emailSettingsFormBody}>
				<div className={styles.emailSettingsFormItem}>
					<TextField
						labelProps={{
							label: 'Service'
						}}
						disabled
						fullWidth
						{...register('service')}
					/>
				</div>
				<div className={styles.emailSettingsFormItem}>
					<TextField
						labelProps={{
							label: 'Password',
							required: true
						}}
						errorMessageProps={{
							message: errors.password?.message as string
						}}
						fullWidth
						{...register('password', {
							required: { value: true, message: 'Required field!' }
						})}
					/>
				</div>
				<div className={styles.emailSettingsFormItem}>
					<TextField
						labelProps={{
							label: 'User',
							required: true
						}}
						errorMessageProps={{
							message: errors.user?.message as string
						}}
						fullWidth
						{...register('user', {
							required: { value: true, message: 'Required field!' }
						})}
					/>
				</div>
			</div>
			<div className={styles.emailSettingsFormFooter}></div>
		</div>
	);
};

export default EmailSettingsForm;
