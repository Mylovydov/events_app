import {
	TCreateEventsInput,
	TCreateEventsOutput,
	TGetEventsInput,
	TGetEventsOutput
} from '@/services';
import { trpcClient } from '@/trpc';
import baseApi from '../base/baseApi.ts';

export const eventsApi = baseApi.injectEndpoints({
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
