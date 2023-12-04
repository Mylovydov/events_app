import { trpcClient } from '@/trpc';
import {
	baseApi,
	TLoginInput,
	TLoginOutput,
	TLogoutInput,
	TLogoutOutput,
	TRefreshOutput,
	TRegisterInput,
	TRegisterOutput
} from '@/services';

export const authApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation<TRegisterOutput, TRegisterInput>({
			query: arg => trpcClient.auth.register.mutate(arg)
		}),

		login: builder.mutation<TLoginOutput, TLoginInput>({
			query: arg => trpcClient.auth.login.mutate(arg)
		}),

		logout: builder.mutation<TLogoutOutput, TLogoutInput>({
			query: arg => trpcClient.auth.logout.mutate(arg)
		}),

		refresh: builder.query<TRefreshOutput, void>({
			query: () => trpcClient.auth.refresh.query()
		})
	})
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useRefreshQuery
} = authApi;
