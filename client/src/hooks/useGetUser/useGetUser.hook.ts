import { useGetUserQuery } from '@/services';
import { TUseGetUserReturn, useHandleError } from '@/hooks';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';

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
