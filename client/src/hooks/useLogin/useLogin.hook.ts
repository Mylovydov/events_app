import { TLoginInput, useLoginMutation } from '@/services';
import { TUseLoginReturn, useHandleError, useNotify } from '@/hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SETTINGS_PATH } from '@/routes';

const useLogin = (): TUseLoginReturn => {
	const navigate = useNavigate();
	const { successNotify } = useNotify();
	const handleError = useHandleError();
	const [loginTrigger, { isLoading: isLogging }] = useLoginMutation();

	const login = useCallback(
		(args: TLoginInput) => {
			loginTrigger(args)
				.unwrap()
				.then(data => {
					data?.message && successNotify(data?.message);
					navigate(SETTINGS_PATH);
				})
				.catch(handleError);
		},
		[loginTrigger, successNotify, navigate, handleError]
	);

	return {
		login,
		isLogging
	};
};

export default useLogin;
