import styles from './emailSettingsForm.module.css';
import { PasswordField, TextField } from '@/components';
import { useFormContext } from 'react-hook-form';
import VerifiedCheckmark from '../verifiedCheckmark/VerifiedCheckmark.tsx';
import { TSettingsFormValues } from '@/containers';
import { requiredFieldMessage } from '@/utils';

const EmailSettingsForm = () => {
	const {
		register,
		formState: { errors },
		getValues
	} = useFormContext<TSettingsFormValues>();
	const { isSettingsVerified } = getValues();

	const verifiedCheckmarkMarkup = (
		<VerifiedCheckmark
			label={`Email settings is ${isSettingsVerified ? '' : 'not'} verified!`}
			isVerified={isSettingsVerified}
		/>
	);

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
					<PasswordField
						labelProps={{
							label: 'Service Password',
							required: true
						}}
						errorMessageProps={{
							message: errors.servicePassword?.message as string
						}}
						fullWidth
						{...register('servicePassword', {
							required: { value: true, message: requiredFieldMessage }
						})}
					/>
				</div>
				<div className={styles.emailSettingsFormItem}>
					<TextField
						labelProps={{
							label: 'Service email',
							required: true
						}}
						errorMessageProps={{
							message: errors.serviceEmail?.message as string
						}}
						fullWidth
						{...register('serviceEmail', {
							required: { value: true, message: requiredFieldMessage }
						})}
					/>
				</div>
			</div>
			<div className={styles.emailSettingsFormFooter}>
				{verifiedCheckmarkMarkup}
			</div>
		</div>
	);
};

export default EmailSettingsForm;
