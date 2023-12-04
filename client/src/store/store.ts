import { baseApi } from '@/services';
import { configureStore } from '@reduxjs/toolkit';
import { appUserReducer } from '@/slices';

const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		appUser: appUserReducer
	},
	middleware: getDefaultMiddleware => [
		...getDefaultMiddleware(),
		baseApi.middleware
	]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
