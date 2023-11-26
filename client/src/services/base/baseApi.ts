import { createApi } from '@reduxjs/toolkit/query/react';
import { EVENTS_API_TAG, USERS_API_TAG } from '@/utils';

const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: (trpcResult: Promise<unknown>) =>
		trpcResult.then(data => ({ data })).catch(error => ({ error })),
	tagTypes: [EVENTS_API_TAG, USERS_API_TAG],
	endpoints: () => ({})
});

export default baseApi;
