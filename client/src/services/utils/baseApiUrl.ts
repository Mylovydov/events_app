import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseApiUrl = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_SERVER_URL
});

export default baseApiUrl;
