import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/services';

// export const rtkQueryErrorLogger: Middleware =
// 	(api: MiddlewareAPI) => next => action => {
// 		if (isRejectedWithValue(action)) {
// 			console.warn('We got a rejected action!', action);
// 		}
//
// 		return next(action);
// 	};

const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer
	},
	middleware: getDefaultMiddleware => [
		...getDefaultMiddleware(),
		baseApi.middleware
		// rtkQueryErrorLogger
	]
});

export default store;
