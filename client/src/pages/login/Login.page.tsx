import styles from './login.page.module.css';
import { LoginForm, Logo, TLoginFormProps } from '@/components';
import { FC } from 'react';

export type TLoginPageProps = TLoginFormProps;

const LoginPage: FC<TLoginPageProps> = props => {
	return (
		<div className={styles.loginPage}>
			<div className={styles.loginPageWrapper}>
				<div className={styles.loginPageHeader}>
					<Logo />
				</div>
				<div className={styles.loginPageBody}>
					<LoginForm {...props} />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
