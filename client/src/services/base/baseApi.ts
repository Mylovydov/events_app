import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { EApiTags } from '@/utils';
import { TTRPCClientError } from '@/trpc';

const trpcBaseQuery: BaseQueryFn<
	Promise<unknown>,
	unknown,
	TTRPCClientError
> = async trpcResult =>
	trpcResult.then(data => ({ data })).catch(error => ({ error: error.data }));

const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: trpcBaseQuery,
	tagTypes: [EApiTags.EVENTS, EApiTags.USERS, EApiTags.EMAIL_SETTINGS],
	endpoints: () => ({})
});

export default baseApi;
