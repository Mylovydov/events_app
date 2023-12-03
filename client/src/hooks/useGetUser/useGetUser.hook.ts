import { TGetUserInput, useGetUserQuery } from '@/services';
import { useNotify } from '@/hooks';
import { TUseGetUserReturn } from '@/hooks/useGetUser/useGetUser.types.ts';
import { isTErrorResponse } from '@/utils';

const useGetUser = (
	args: TGetUserInput,
	opt?: { [key: string]: unknown }
): TUseGetUserReturn => {
	const { errorNotify } = useNotify();
	const {
		data: user,
		isLoading: isUserLoading,
		error
	} = useGetUserQuery(args, opt);

	if (error) {
		if (isTErrorResponse(error)) {
			errorNotify(error.zodError || error.message);
		} else {
			errorNotify('Something went wrong');
		}
	}

	return {
		user: user?.data,
		isUserLoading
	};
};

export default useGetUser;
