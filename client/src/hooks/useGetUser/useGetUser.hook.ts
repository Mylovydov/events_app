import { useGetUserQuery } from '@/services';
import { useNotify } from '@/hooks';
import { TUseGetUserReturn } from '@/hooks/useGetUser/useGetUser.types.ts';
import { isTErrorResponse } from '@/utils';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';

const useGetUser = (userId: string | null): TUseGetUserReturn => {
	const { errorNotify } = useNotify();
	const {
		data: user,
		isLoading: isUserLoading,
		error
	} = useGetUserQuery(userId || skipToken);

	useEffect(() => {
		if (error) {
			if (isTErrorResponse(error)) {
				errorNotify(error.zodError || error.message);
			} else {
				errorNotify('Something went wrong');
			}
		}
	}, [error, errorNotify]);

	return {
		user: user?.data,
		isUserLoading
	};
};

export default useGetUser;
