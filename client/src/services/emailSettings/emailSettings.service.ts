import { trpcClient } from '@/trpc';
import {
	baseApi,
	TAddEmailSettingsInput,
	TAddEmailSettingsOutput,
	TResetEmailSettingsInput,
	TResetEmailSettingsOutput
} from '@/services';
import { EApiTags, wrapMetadataInPromise } from '@/utils';

export const emailSettingsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		addEmailSettings: builder.mutation<
			TAddEmailSettingsOutput,
			TAddEmailSettingsInput
		>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.emailSettings.addEmailSettings.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [EApiTags.USERS]
		}),
		resetEmailSettings: builder.mutation<
			TResetEmailSettingsOutput,
			TResetEmailSettingsInput
		>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.emailSettings.resetEmailSettings.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [EApiTags.USERS]
		})
	})
});

export const { useAddEmailSettingsMutation, useResetEmailSettingsMutation } =
	emailSettingsApi;
