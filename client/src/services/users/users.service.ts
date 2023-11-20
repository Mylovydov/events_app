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
		create: builder.mutation<TCreateUserOutput, TCreateUserInput>({
			query: arg => trpcClient.users.create.mutate(arg)
		}),
		getUser: builder.query<TGetUserOutput, TGetUserInput>({
			query: arg => trpcClient.users.getUser.query(arg)
		}),
		getUsers: builder.query<TGetUsersOutput, TGetUsersInput>({
			query: arg => trpcClient.users.getUsers.query(arg)
		}),
		update: builder.query<TUpdateUserOutput, TUpdateUserInput>({
			query: arg => trpcClient.users.update.mutate(arg)
		}),
		delete: builder.query<TDeleteUserOutput, TDeleteUserInput>({
			query: arg => trpcClient.users.delete.mutate(arg)
		}),
		addSmtpSettings: builder.query<
			TAddSMTPSettingsUserOutput,
			TAddSMTPSettingsUserInput
		>({
			query: arg => trpcClient.users.addSmtpSettings.mutate(arg)
		}),
		addAppSettings: builder.query<
			TAddAppSettingsUserOutput,
			TAddAppSettingsUserInput
		>({
			query: arg => trpcClient.users.addAppSettings.mutate(arg)
		})
	})
});

export const {} = usersApi;
