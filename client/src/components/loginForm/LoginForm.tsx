import styles from './loginForm.module.css';
import {
	Button,
	Card,
	PasswordField,
	TextField,
	TLoginFormProps,
	Typography
} from '@/components';
import { useForm } from 'react-hook-form';
import { FC } from 'react';
import { requiredFieldMessage } from '@/utils';

export type TLoginFormValues = {
	email: string;
	password: string;
};

const LoginForm: FC<TLoginFormProps> = ({ defaultValues, onSubmit }) => {
	const {
		formState: { errors },
		handleSubmit,
		register
	} = useForm<TLoginFormValues>({
		defaultValues
	});

	const onHandleSubmit = (data: TLoginFormValues) => {
		onSubmit && onSubmit(data);
	};

	return (
		<Card>
			<form
				className={styles.loginForm}
				onSubmit={handleSubmit(onHandleSubmit)}
			>
				<div className={styles.loginFormHeader}>
					<Typography
						text="Login"
						variant="h5"
						weight="medium"
						textAlign="center"
					/>
				</div>
				<div className={styles.loginFormBody}>
					<TextField
						labelProps={{
							label: 'Email',
							required: true
						}}
						errorMessageProps={{
							message: errors.email?.message as string
						}}
						fullWidth
						{...register('email', {
							required: { value: true, message: requiredFieldMessage }
						})}
					/>
					<PasswordField
						labelProps={{
							label: 'Password',
							required: true
						}}
						errorMessageProps={{
							message: errors.password?.message as string
						}}
						fullWidth
						{...register('password', {
							required: { value: true, message: requiredFieldMessage }
						})}
					/>
				</div>
				<div className={styles.loginFormFooter}>
					<Button label="Sing in" />
				</div>
			</form>
		</Card>
	);
};

export default LoginForm;
