import { trpcClient } from '@/trpc';
import {
	baseApi,
	TAddAppSettingsInput,
	TAddAppSettingsOutput,
	TResetAppSettingsInput,
	TResetAppSettingsOutput
} from '@/services';
import { EApiTags } from '@/utils';

export const appSettingsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		addAppSettings: builder.mutation<
			TAddAppSettingsOutput,
			TAddAppSettingsInput
		>({
			query: arg => trpcClient.appSettings.addEmailSettings.mutate(arg),
			invalidatesTags: [EApiTags.USERS, EApiTags.EVENTS],
			transformErrorResponse: ({ data }) => data
		}),

		resetAppSettings: builder.mutation<
			TResetAppSettingsOutput,
			TResetAppSettingsInput
		>({
			query: arg => trpcClient.appSettings.resetAppSettings.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [EApiTags.USERS]
		})
	})
});

export const { useAddAppSettingsMutation, useResetAppSettingsMutation } =
	appSettingsApi;
