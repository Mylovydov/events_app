import {
	baseApi,
	TCreateEventsInput,
	TCreateEventsOutput,
	TGetEventsInput,
	TGetEventsOutput
} from '@/services';
import { trpcClient } from '@/trpc';
import { EApiTags, wrapMetadataInPromise } from '@/utils';

export const eventsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createEvents: builder.mutation<TCreateEventsOutput, TCreateEventsInput>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.events.create.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [{ type: EApiTags.EVENTS, id: EApiTags.LIST }]
		}),

		getEvents: builder.query<TGetEventsOutput, TGetEventsInput>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.events.getEvents.query,
					requestArgs: arg
				}),
			providesTags: result => {
				if (!result) {
					return [
						{ type: EApiTags.EVENTS as const, id: EApiTags.LIST as const }
					];
				}

				return [
					...result.data.events.map(({ _id }) => ({
						type: EApiTags.EVENTS as const,
						id: _id
					})),
					{ type: EApiTags.EVENTS as const, id: EApiTags.LIST as const }
				];
			}
		})
	})
});

export const { useCreateEventsMutation, useGetEventsQuery } = eventsApi;
