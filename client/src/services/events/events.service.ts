import { createApi } from '@reduxjs/toolkit/query/react';
import trpcClient from '../../trpc/trpc.ts';
import type { inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

type TUpload = inferProcedureOutput<TAppRouter['upload']['create']>;

export const eventsApi = createApi({
	reducerPath: 'eventsApi',
	baseQuery: (trpcResult: Promise<unknown>) =>
		trpcResult.then(data => ({ data })).catch(error => ({ error })),
	tagTypes: ['Events'],
	endpoints: builder => ({
		create: builder.mutation<TUpload, string>({
			query: arg => trpcClient.upload.create.mutate({ file: arg })
		})
	})
});

export const { useCreateMutation } = eventsApi;
