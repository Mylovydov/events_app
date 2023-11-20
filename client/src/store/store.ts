import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/services';

const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer
	},
	middleware: getDefaultMiddleware => [
		...getDefaultMiddleware(),
		baseApi.middleware
	]
});

export default store;
