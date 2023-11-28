import { trpcClient } from '@/trpc';
import {
	baseApi,
	TAddEmailSettingsInput,
	TAddEmailSettingsOutput
} from '@/services';
import { EApiTags } from '@/utils';

export const emailSettingsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		addEmailSettings: builder.mutation<
			TAddEmailSettingsOutput,
			TAddEmailSettingsInput
		>({
			query: arg => trpcClient.emailSettings.addEmailSettings.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [EApiTags.USERS]
		})
	})
});

export const { useAddEmailSettingsMutation } = emailSettingsApi;
