import { useGetUserQuery } from '@/services';
import { TUseGetUserReturn, useNotify } from '@/hooks';
import { isTErrorResponse } from '@/utils';
import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useEffect } from 'react';
import { TTRPCClientError } from '@/trpc';
import { SerializedError } from '@reduxjs/toolkit';

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

const useGetUser = (userId: string | null): TUseGetUserReturn => {
	const handleError = useHandleError();

	const {
		data: user,
		isLoading: isUserLoading,
		error
	} = useGetUserQuery(userId || skipToken);

	useEffect(() => handleError(error), [error, handleError]);

	return {
		user: user?.data,
		isUserLoading
	};
};

export default useGetUser;
