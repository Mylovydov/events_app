import { trpcClient } from '@/trpc';
import {
	baseApi,
	TResendInvitationToEventsInput,
	TResendInvitationToEventsOutput,
	TSendInvitationToEventInput,
	TSendInvitationToEventOutput,
	TSendInvitationToEventsInput,
	TSendInvitationToEventsOutput
} from '@/services';
import { EApiTags } from '@/utils';

export const emailApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		sendInvitationToEvent: builder.mutation<
			TSendInvitationToEventOutput,
			TSendInvitationToEventInput
		>({
			query: arg => trpcClient.email.sendInvitationToEvent.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [EApiTags.EVENTS]
		}),

		sendInvitationToEvents: builder.mutation<
			TSendInvitationToEventsOutput,
			TSendInvitationToEventsInput
		>({
			query: arg => trpcClient.email.sendInvitationToEvents.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [EApiTags.EVENTS]
		}),

		resendAllInvitationToEvents: builder.mutation<
			TResendInvitationToEventsOutput,
			TResendInvitationToEventsInput
		>({
			query: arg => trpcClient.email.resendAllInvitationToEvents.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [EApiTags.EVENTS]
		})
	})
});

export const {
	useSendInvitationToEventMutation,
	useSendInvitationToEventsMutation,
	useResendAllInvitationToEventsMutation
} = emailApi;
