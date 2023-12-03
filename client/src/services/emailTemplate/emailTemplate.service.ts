import { trpcClient } from '@/trpc';
import {
	baseApi,
	TAddEmailTemplateInput,
	TAddEmailTemplateOutput
} from '@/services';
import { EApiTags } from '@/utils';

export const emailTemplateApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		addEmailTemplate: builder.mutation<
			TAddEmailTemplateOutput,
			TAddEmailTemplateInput
		>({
			query: arg => trpcClient.emailTemplate.addEmailTemplate.mutate(arg),
			invalidatesTags: [EApiTags.USERS]
		})
	})
});

export const { useAddEmailTemplateMutation } = emailTemplateApi;
