import { LoginPage } from '@/pages';
import { TLoginFormValues } from '@/components';
import { useLogin } from '@/hooks';

const loginFormDefaultValues = {
	email: '',
	password: ''
};

const LoginPageContainer = () => {
	const { login, isLogging } = useLogin();
	const onSubmit = (data: TLoginFormValues) => {
		login(data);
	};

	return (
		<LoginPage
			defaultValues={loginFormDefaultValues}
			onSubmit={onSubmit}
			isLoading={isLogging}
		/>
	);
};

export default LoginPageContainer;
