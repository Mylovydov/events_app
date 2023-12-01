import { TRegisterInput, useRegisterMutation } from '@/services';
import { TUseRegisterReturn, useNotify } from '@/hooks';
import { useCallback } from 'react';

const useRegister = (): TUseRegisterReturn => {
	const { errorNotify, successNotify } = useNotify();
	const [registerTrigger, { isLoading: isRegistering }] = useRegisterMutation();

	const register = useCallback(
		(args: TRegisterInput) => {
			registerTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(err => errorNotify(err.message));
		},
		[registerTrigger, successNotify, errorNotify]
	);

	return {
		register,
		isRegistering
	};
};

export default useRegister;
