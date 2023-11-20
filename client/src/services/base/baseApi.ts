import { createApi } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: (trpcResult: Promise<unknown>) =>
		trpcResult.then(data => ({ data })).catch(error => ({ error })),
	tagTypes: ['Events'],
	endpoints: () => ({})
});

export default baseApi;
