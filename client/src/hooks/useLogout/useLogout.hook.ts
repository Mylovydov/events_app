import { TLogoutInput, useLogoutMutation } from '@/services';
import { TUseLogoutReturn, useNotify } from '@/hooks';
import { useCallback } from 'react';
import useHandleError from '../useHandleError/useHandleError.hook.ts';
import { localStorageService } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '@/routes';

const useLogout = (): TUseLogoutReturn => {
	const handleError = useHandleError();
	const navigate = useNavigate();
	const { successNotify } = useNotify();
	const [logoutTrigger, { isLoading: isLoggingOut }] = useLogoutMutation();

	const logout = useCallback(
		(args: TLogoutInput) => {
			logoutTrigger(args)
				.unwrap()
				.then(data => {
					localStorageService.removeToken();
					navigate(LOGIN_PATH);
					successNotify(data.message);
				})
				.catch(handleError);
		},
		[logoutTrigger, successNotify, handleError, navigate]
	);

	return {
		logout,
		isLoggingOut
	};
};

export default useLogout;
