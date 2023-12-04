import { TLoginInput, useLoginMutation } from '@/services';
import { TUseLoginReturn, useNotify } from '@/hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SETTINGS_PATH } from '@/routes';

const useLogin = (): TUseLoginReturn => {
	const navigate = useNavigate();
	const { errorNotify, successNotify } = useNotify();
	const [loginTrigger, { isLoading: isLogging }] = useLoginMutation();

	const login = useCallback(
		(args: TLoginInput) => {
			loginTrigger(args)
				.unwrap()
				.then(data => {
					successNotify(data.message);
					navigate(SETTINGS_PATH);
				})
				.catch(({ message, zodError }) => errorNotify(zodError || message));
		},
		[loginTrigger, successNotify, navigate, errorNotify]
	);

	return {
		login,
		isLogging
	};
};

export default useLogin;
