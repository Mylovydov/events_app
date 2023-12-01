import { TLogoutInput, useLogoutMutation } from '@/services';
import { TUseLogoutReturn, useNotify } from '@/hooks';
import { useCallback } from 'react';

const useLogout = (): TUseLogoutReturn => {
	const { errorNotify, successNotify } = useNotify();
	const [logoutTrigger, { isLoading: isLoggingOut }] = useLogoutMutation();

	const logout = useCallback(
		(args: TLogoutInput) => {
			logoutTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(({ message, zodError }) => errorNotify(zodError || message));
		},
		[logoutTrigger, successNotify, errorNotify]
	);

	return {
		logout,
		isLoggingOut
	};
};

export default useLogout;
