import { useNotify } from '@/hooks';
import { useCallback } from 'react';
import { TTRPCClientError } from '@/trpc';
import { SerializedError } from '@reduxjs/toolkit';
import { isTErrorResponse } from '@/utils';

const useHandleError = () => {
	const { errorNotify } = useNotify();
	return useCallback(
		(error?: TTRPCClientError | SerializedError) => {
			if (!error) {
				return;
			}

			if (isTErrorResponse(error)) {
				return errorNotify(error.zodError || error.message);
			}
			errorNotify('Something went wrong');
		},
		[errorNotify]
	);
};

export default useHandleError;
