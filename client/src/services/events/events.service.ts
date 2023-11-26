import {
	baseApi,
	TCreateEventsInput,
	TCreateEventsOutput,
	TGetEventsInput,
	TGetEventsOutput
} from '@/services';
import { trpcClient } from '@/trpc';
import { EVENTS_API_TAG } from '@/utils';

export const eventsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createEvents: builder.mutation<
			TCreateEventsOutput,
			TCreateEventsInput['file']
		>({
			query: arg => trpcClient.events.create.mutate({ file: arg }),
			invalidatesTags: [EVENTS_API_TAG],
			transformErrorResponse: ({ data }) => data
		}),

		getEvents: builder.query<TGetEventsOutput, TGetEventsInput>({
			query: arg => trpcClient.events.getEvents.query(arg),
			providesTags: result => {
				if (!result) {
					return [EVENTS_API_TAG];
				}
				return result.data.events.map(({ _id }) => ({
					type: EVENTS_API_TAG,
					id: _id
				}));
			},
			transformErrorResponse: ({ data }) => data
		})
	})
});

export const { useCreateEventsMutation, useGetEventsQuery } = eventsApi;
