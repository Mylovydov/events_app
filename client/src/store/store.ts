import { configureStore } from '@reduxjs/toolkit';
import { eventsApi } from '@/services';

const store = configureStore({
	reducer: {
		[eventsApi.reducerPath]: eventsApi.reducer
	},
	middleware: getDefaultMiddleware => [
		...getDefaultMiddleware(),
		eventsApi.middleware
	]
});

export default store;
