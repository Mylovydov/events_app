import { createApi } from '@reduxjs/toolkit/query/react';
import {
	TCreateEventsInput,
	TCreateEventsOutput,
	TGetEventsInput
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

		getEvents: builder.query<TCreateEventsOutput, TGetEventsInput>({
			query: arg => trpcClient.events.getEvents.query(arg)
		})
	})
});

export const { useCreateMutation, useGetEventsQuery } = eventsApi;
