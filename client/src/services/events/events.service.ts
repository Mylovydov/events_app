import { createApi } from '@reduxjs/toolkit/query/react';
import { TCreateEventsInput, TCreateEventsOutput } from '@/services';
import { trpcClient } from '@/trpc';

export const eventsApi = createApi({
	reducerPath: 'eventsApi',
	baseQuery: (trpcResult: Promise<unknown>) =>
		trpcResult.then(data => ({ data })).catch(error => ({ error })),
	tagTypes: ['Events'],
	endpoints: builder => ({
		uploadEvents: builder.mutation<
			TCreateEventsOutput,
			TCreateEventsInput['file']
		>({
			query: arg => trpcClient.events.create.mutate({ file: arg })
		})
	})
});

export const { useUploadEventsMutation } = eventsApi;
