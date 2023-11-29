import { trpcClient } from '@/trpc';
import {
	baseApi,
	TAddAppSettingsInput,
	TAddAppSettingsOutput
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
		})
	})
});

export const { useAddAppSettingsMutation } = appSettingsApi;
