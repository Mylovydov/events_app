import { createApi } from '@reduxjs/toolkit/query/react';
import trpcClient from '../../trpc/trpc.ts';
import { TUploadInput, TUploadOutput } from './events.types';

export const eventsApi = createApi({
	reducerPath: 'eventsApi',
	baseQuery: (trpcResult: Promise<unknown>) =>
		trpcResult.then(data => ({ data })).catch(error => ({ error })),
	tagTypes: ['Events'],
	endpoints: builder => ({
		uploadEvents: builder.mutation<TUploadOutput, TUploadInput['file']>({
			query: arg => trpcClient.upload.create.mutate({ file: arg })
		})
	})
});

export const { useUploadEventsMutation } = eventsApi;
