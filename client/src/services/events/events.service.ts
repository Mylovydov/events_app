import {
	baseApi,
	TCreateEventsInput,
	TCreateEventsOutput,
	TGetEventsInput,
	TGetEventsOutput
} from '@/services';
import { trpcClient } from '@/trpc';

export const eventsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createEvents: builder.mutation<
			TCreateEventsOutput,
			TCreateEventsInput['file']
		>({
			query: arg => trpcClient.events.create.mutate({ file: arg }),
			invalidatesTags: ['Events'],
			transformErrorResponse: ({ data }) => data
		}),

		getEvents: builder.query<TGetEventsOutput, TGetEventsInput>({
			query: arg => trpcClient.events.getEvents.query(arg),
			providesTags: result => {
				if (!result) {
					return ['Events'];
				}
				return result.data.events.map(({ _id }) => ({
					type: 'Events' as const,
					id: _id
				}));
			},
			transformErrorResponse: ({ data }) => data
		})
	})
});

export const { useCreateEventsMutation, useGetEventsQuery } = eventsApi;
