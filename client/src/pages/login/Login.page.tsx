import styles from './login.page.module.css';
import { LoginForm, Logo } from '@/components';

const loginFormDefaultValues = {
	email: '',
	password: ''
};

const LoginPage = () => {
	return (
		<div className={styles.loginPage}>
			<div className={styles.loginPageWrapper}>
				<div className={styles.loginPageHeader}>
					<Logo />
				</div>
				<div className={styles.loginPageBody}>
					<LoginForm defaultValues={loginFormDefaultValues} />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
