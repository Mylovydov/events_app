import { trpcClient } from '@/trpc';
import {
	baseApi,
	TAddEmailTemplateInput,
	TAddEmailTemplateOutput
} from '@/services';
import { EApiTags, wrapMetadataInPromise } from '@/utils';

export const emailTemplateApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		addEmailTemplate: builder.mutation<
			TAddEmailTemplateOutput,
			TAddEmailTemplateInput
		>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.emailTemplate.addEmailTemplate.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [EApiTags.USERS]
		})
	})
});

export const { useAddEmailTemplateMutation } = emailTemplateApi;
