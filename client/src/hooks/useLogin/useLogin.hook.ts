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
					data?.message && successNotify(data?.message);
					navigate(SETTINGS_PATH);
				})
				.catch(error => {
					errorNotify(error?.zodError || error?.message);
				});
		},
		[loginTrigger, successNotify, navigate, errorNotify]
	);

	return {
		login,
		isLogging
	};
};

export default useLogin;
