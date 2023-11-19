import { configureStore } from '@reduxjs/toolkit';
import { eventsApi } from '@/services';

export const store = configureStore({
	reducer: {
		[eventsApi.reducerPath]: eventsApi.reducer
	},
	middleware: getDefaultMiddleware => [
		...getDefaultMiddleware(),
		eventsApi.middleware
	]
});
