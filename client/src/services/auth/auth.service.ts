import { trpcClient } from '@/trpc';
import {
	baseApi,
	TLoginInput,
	TLoginOutput,
	TLogoutInput,
	TLogoutOutput,
	TRefreshInput,
	TRefreshOutput,
	TRegisterInput,
	TRegisterOutput
} from '@/services';
import { setTokenToLS } from '@/utils';

const transformAuthResponse = (resp: TLoginOutput | TRegisterOutput) => {
	setTokenToLS(resp.data.accessToken);
	return resp;
};

export const authApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation<TRegisterOutput, TRegisterInput>({
			query: arg => trpcClient.auth.register.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			transformResponse: transformAuthResponse
		}),

		login: builder.mutation<TLoginOutput, TLoginInput>({
			query: arg => trpcClient.auth.login.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			transformResponse: transformAuthResponse
		}),

		logout: builder.mutation<TLogoutOutput, TLogoutInput>({
			query: arg => trpcClient.auth.logout.mutate(arg),
			transformErrorResponse: ({ data }) => data
		}),

		refresh: builder.mutation<TRefreshOutput, TRefreshInput>({
			query: arg => trpcClient.auth.refresh.mutate(arg),
			transformErrorResponse: ({ data }) => data
		})
	})
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useRefreshMutation
} = authApi;
