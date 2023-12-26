import { trpcClient } from '@/trpc';
import {
	baseApi,
	TAddAppSettingsInput,
	TAddAppSettingsOutput,
	TResetAppSettingsInput,
	TResetAppSettingsOutput
} from '@/services';
import { EApiTags, wrapMetadataInPromise } from '@/utils';

export const appSettingsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		addAppSettings: builder.mutation<
			TAddAppSettingsOutput,
			TAddAppSettingsInput
		>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.appSettings.addEmailSettings.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [EApiTags.USERS, EApiTags.EVENTS]
		}),

		resetAppSettings: builder.mutation<
			TResetAppSettingsOutput,
			TResetAppSettingsInput
		>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.appSettings.resetAppSettings.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [EApiTags.USERS]
		})
	})
});

export const { useAddAppSettingsMutation, useResetAppSettingsMutation } =
	appSettingsApi;
