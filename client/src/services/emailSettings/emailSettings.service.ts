import { trpcClient } from '@/trpc';
import {
	baseApi,
	TAddEmailSettingsInput,
	TAddEmailSettingsOutput,
	TResetEmailSettingsInput,
	TResetEmailSettingsOutput
} from '@/services';
import { EApiTags } from '@/utils';

export const emailSettingsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		addEmailSettings: builder.mutation<
			TAddEmailSettingsOutput,
			TAddEmailSettingsInput
		>({
			query: arg => trpcClient.emailSettings.addEmailSettings.mutate(arg),
			invalidatesTags: [EApiTags.USERS]
		}),
		resetEmailSettings: builder.mutation<
			TResetEmailSettingsOutput,
			TResetEmailSettingsInput
		>({
			query: arg => trpcClient.emailSettings.resetEmailSettings.mutate(arg),
			invalidatesTags: [EApiTags.USERS]
		})
	})
});

export const { useAddEmailSettingsMutation, useResetEmailSettingsMutation } =
	emailSettingsApi;
