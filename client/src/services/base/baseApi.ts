import { createApi } from '@reduxjs/toolkit/query/react';
import { EApiTags } from '@/utils';

const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: (trpcResult: Promise<unknown>) =>
		trpcResult.then(data => ({ data })).catch(error => ({ error })),
	tagTypes: [EApiTags.EVENTS, EApiTags.USERS, EApiTags.EMAIL_SETTINGS],
	endpoints: () => ({})
});

export default baseApi;
