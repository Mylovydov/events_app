import { TLoginInput, useLoginMutation } from '@/services';
import { TUseLoginReturn, useNotify } from '@/hooks';
import { useCallback } from 'react';

const useLogin = (): TUseLoginReturn => {
	const { errorNotify, successNotify } = useNotify();
	const [loginTrigger, { isLoading: isLogging }] = useLoginMutation();

	const login = useCallback(
		(args: TLoginInput) => {
			loginTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(err => errorNotify(err.message));
		},
		[loginTrigger, successNotify, errorNotify]
	);

	return {
		login,
		isLogging
	};
};

export default useLogin;
