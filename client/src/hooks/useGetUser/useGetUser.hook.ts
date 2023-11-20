import { TGetUserInput, useGetUserQuery } from '@/services';
import { useNotify } from '@/hooks';
import { TUseGetUserReturn } from '@/hooks/useGetUser/useGetUser.types.ts';

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
		errorNotify(JSON.stringify(error));
	}

	return {
		user: user?.data,
		isUserLoading
	};
};

export default useGetUser;
