import { createApi } from '@reduxjs/toolkit/query/react';
import { EApiTags } from '@/utils';
import { trpcBaseQueryWithReauth } from '@/services';

const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: trpcBaseQueryWithReauth,
	// baseQuery: trpcBaseQueryWithReauth,
	tagTypes: [EApiTags.EVENTS, EApiTags.USERS, EApiTags.EMAIL_SETTINGS],
	endpoints: () => ({})
});

export default baseApi;
