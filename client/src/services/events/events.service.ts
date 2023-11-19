import { createApi } from '@reduxjs/toolkit/query/react';
import {
	TCreateEventsInput,
	TCreateEventsOutput,
	TGetEventsInput,
	TGetEventsOutput
} from '@/services';
import { trpcClient } from '@/trpc';

export const eventsApi = createApi({
	reducerPath: 'eventsApi',
	baseQuery: (trpcResult: Promise<unknown>) =>
		trpcResult.then(data => ({ data })).catch(error => ({ error })),
	tagTypes: ['Events'],
	endpoints: builder => ({
		create: builder.mutation<TCreateEventsOutput, TCreateEventsInput['file']>({
			query: arg => trpcClient.events.create.mutate({ file: arg })
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
			}
		})
	})
});

export const { useCreateMutation, useGetEventsQuery } = eventsApi;
