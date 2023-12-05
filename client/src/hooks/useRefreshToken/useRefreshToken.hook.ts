import { useLazyRefreshQuery } from '@/services';

// export type TUseRefreshTokenReturn = {
//
// };

const useRefreshToken = () => {
	const [refreshTokenTrigger] = useLazyRefreshQuery();

	// const refreshToken = useCallback(() => {}, []);

	return refreshTokenTrigger;
};

export default useRefreshToken;
