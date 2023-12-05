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
				console.log('useGetUser', error);
				return errorNotify(error.zodError || error.message);
			}
			errorNotify('Something went wrong');
		},
		[errorNotify]
	);
};

const useGetUser = (userId: string | null): TUseGetUserReturn => {
	const handleError = useHandleError();
	// const refreshToken = useRefreshToken();

	const {
		data: user,
		isLoading: isUserLoading,
		error
	} = useGetUserQuery(userId || skipToken);

	useEffect(() => {
		handleError(error);
		// if (!error) {
		// 	return;
		// }
		//
		// if (isTErrorResponse(error)) {
		// 	console.log('useGetUser', error);
		// 	if (error.status === 401) {
		// 		refreshToken()
		// 			.unwrap()
		// 			.then(() => {
		// 				console.log('userId', userId);
		// 				refetch();
		// 			})
		// 			.catch(error => {
		// 				console.log('refreshTokenError', error);
		// 				dispatch(clearAppUser());
		// 			});
		// 	}
		// 	return errorNotify(error.zodError || error.message);
		// }
		// errorNotify('Something went wrong');
	}, [error, handleError]);

	return {
		user: user?.data,
		isUserLoading
	};
};

export default useGetUser;
