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

export const usersApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createUser: builder.mutation<TCreateUserOutput, TCreateUserInput>({
			query: arg => trpcClient.users.create.mutate(arg)
		}),
		getUser: builder.query<TGetUserOutput, TGetUserInput>({
			query: arg => trpcClient.users.getUser.query(arg)
		}),
		getUsers: builder.query<TGetUsersOutput, TGetUsersInput>({
			query: arg => trpcClient.users.getUsers.query(arg)
		}),
		updateUser: builder.mutation<TUpdateUserOutput, TUpdateUserInput>({
			query: arg => trpcClient.users.update.mutate(arg)
		}),
		deleteUser: builder.mutation<TDeleteUserOutput, TDeleteUserInput>({
			query: arg => trpcClient.users.delete.mutate(arg)
		}),
		addSmtpSettings: builder.mutation<
			TAddSMTPSettingsUserOutput,
			TAddSMTPSettingsUserInput
		>({
			query: arg => trpcClient.users.addSmtpSettings.mutate(arg)
		}),
		addAppSettings: builder.mutation<
			TAddAppSettingsUserOutput,
			TAddAppSettingsUserInput
		>({
			query: arg => trpcClient.users.addAppSettings.mutate(arg)
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
