import { trpcClient } from '@/trpc';
import {
	baseApi,
	TAddAppSettingsUserInput,
	TAddAppSettingsUserOutput,
	TAddSMTPSettingsUserInput,
	TAddSMTPSettingsUserOutput,
	TCreateUserInput,
	TCreateUserOutput,
	TDeleteUserInput,
	TDeleteUserOutput,
	TGetUserInput,
	TGetUserOutput,
	TGetUsersInput,
	TGetUsersOutput,
	TUpdateUserInput,
	TUpdateUserOutput
} from '@/services';
import { USERS_API_TAG } from '@/utils';

export const usersApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createUser: builder.mutation<TCreateUserOutput, TCreateUserInput>({
			query: arg => trpcClient.users.create.mutate(arg)
		}),
		getUser: builder.query<TGetUserOutput, TGetUserInput>({
			query: arg => trpcClient.users.getUser.query(arg),
			transformErrorResponse: ({ data }) => data,
			providesTags: (_, __, { userId }) => [{ type: USERS_API_TAG, id: userId }]
		}),
		getUsers: builder.query<TGetUsersOutput, TGetUsersInput>({
			query: arg => trpcClient.users.getUsers.query(arg),
			transformErrorResponse: ({ data }) => data,
			providesTags: result => {
				if (!result) {
					return [USERS_API_TAG];
				}
				return result.data.map(({ _id }) => ({
					type: USERS_API_TAG,
					id: _id
				}));
			}
		}),
		updateUser: builder.mutation<TUpdateUserOutput, TUpdateUserInput>({
			query: arg => trpcClient.users.update.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [USERS_API_TAG]
		}),
		deleteUser: builder.mutation<TDeleteUserOutput, TDeleteUserInput>({
			query: arg => trpcClient.users.delete.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [USERS_API_TAG]
		}),
		addSmtpSettings: builder.mutation<
			TAddSMTPSettingsUserOutput,
			TAddSMTPSettingsUserInput
		>({
			query: arg => trpcClient.users.addSmtpSettings.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [USERS_API_TAG]
		}),
		addAppSettings: builder.mutation<
			TAddAppSettingsUserOutput,
			TAddAppSettingsUserInput
		>({
			query: arg => trpcClient.users.addAppSettings.mutate(arg),
			invalidatesTags: [USERS_API_TAG],
			transformErrorResponse: ({ data }) => data
		})
	})
});

export const {
	useCreateUserMutation,
	useGetUserQuery,
	useGetUsersQuery,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useAddAppSettingsMutation,
	useAddSmtpSettingsMutation
} = usersApi;
