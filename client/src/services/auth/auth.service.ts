import { trpcClient } from '@/trpc';
import {
	baseApi,
	TLoginInput,
	TLoginOutput,
	TLogoutInput,
	TLogoutOutput,
	TRegisterInput,
	TRegisterOutput
} from '@/services';
import { wrapMetadataInPromise } from '@/utils';

export const authApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation<TRegisterOutput, TRegisterInput>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.auth.register.mutate,
					requestArgs: arg
				})
		}),

		login: builder.mutation<TLoginOutput, TLoginInput>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.auth.login.mutate,
					requestArgs: arg
				})
		}),

		logout: builder.mutation<TLogoutOutput, TLogoutInput>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.auth.logout.mutate,
					requestArgs: arg
				})
		})
	})
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
	authApi;
