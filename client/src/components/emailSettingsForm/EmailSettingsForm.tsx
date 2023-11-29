import styles from './emailSettingsForm.module.css';
import { FC, useState } from 'react';
import { TEmailSettingsFormProps, TextField } from '@/components';
import { useFormContext } from 'react-hook-form';
import VerifiedCheckmark from '../verifiedCheckmark/VerifiedCheckmark.tsx';
import { TSettingsFormValues } from '@/containers';

const EmailSettingsForm: FC<TEmailSettingsFormProps> = () => {
	const [isShowPassword, setIsShowPassword] = useState(false);

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
					<TextField
						labelProps={{
							label: 'Service Password',
							required: true
						}}
						errorMessageProps={{
							message: errors.servicePassword?.message as string
						}}
						fullWidth
						type={isShowPassword ? 'text' : 'password'}
						icon={isShowPassword ? 'eye-slash' : 'eye'}
						onIconClick={() => setIsShowPassword(prev => !prev)}
						{...register('servicePassword', {
							required: { value: true, message: 'Required field!' }
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
							required: { value: true, message: 'Required field!' }
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
