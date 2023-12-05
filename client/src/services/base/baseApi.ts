import { createApi } from '@reduxjs/toolkit/query/react';
import { EApiTags } from '@/utils';
// import { trpcBaseQueryWithReauth } from '@/services';
import trpcBaseQueryWithReauth from './trpcBaseQueryWithReauth.ts';

const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: trpcBaseQueryWithReauth,
	tagTypes: [EApiTags.EVENTS, EApiTags.USERS, EApiTags.EMAIL_SETTINGS],
	endpoints: () => ({})
});

export default baseApi;
