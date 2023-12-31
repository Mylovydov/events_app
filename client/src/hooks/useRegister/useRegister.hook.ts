import { TRegisterInput, useRegisterMutation } from '@/services';
import { TUseRegisterReturn, useHandleError, useNotify } from '@/hooks';
import { useCallback } from 'react';

const useRegister = (): TUseRegisterReturn => {
	const handleError = useHandleError();
	const { successNotify } = useNotify();
	const [registerTrigger, { isLoading: isRegistering }] = useRegisterMutation();

	const register = useCallback(
		(args: TRegisterInput) => {
			registerTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(handleError);
		},
		[registerTrigger, successNotify, handleError]
	);

	return {
		register,
		isRegistering
	};
};

export default useRegister;
