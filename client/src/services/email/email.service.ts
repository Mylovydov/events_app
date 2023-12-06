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
import { EApiTags, wrapMetadataInPromise } from '@/utils';

export const emailApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		sendInvitationToEvent: builder.mutation<
			TSendInvitationToEventOutput,
			TSendInvitationToEventInput
		>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.email.sendInvitationToEvent.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [EApiTags.EVENTS]
		}),

		sendInvitationToEvents: builder.mutation<
			TSendInvitationToEventsOutput,
			TSendInvitationToEventsInput
		>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.email.sendInvitationToEvents.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [EApiTags.EVENTS]
		}),

		resendAllInvitationToEvents: builder.mutation<
			TResendInvitationToEventsOutput,
			TResendInvitationToEventsInput
		>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.email.resendAllInvitationToEvents.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [EApiTags.EVENTS]
		})
	})
});

export const {
	useSendInvitationToEventMutation,
	useSendInvitationToEventsMutation,
	useResendAllInvitationToEventsMutation
} = emailApi;
