import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAppUserState } from '@/slices';
import { TSuccessResponse, TUser, usersApi } from '@/services';

const initialState: TAppUserState = {
	user: null,
	isAppUserAuth: false,
	isAppUserLoading: false
};

export const appUserSlice = createSlice({
	name: 'appUser',
	initialState,
	reducers: {
		clearAppUser: state => {
			state.user = null;
			state.isAppUserAuth = false;
		}
	},
	extraReducers: builder => {
		builder.addMatcher(usersApi.endpoints.getUser.matchPending, state => {
			state.isAppUserLoading = true;
		});
		builder.addMatcher(
			usersApi.endpoints.getUser.matchFulfilled,
			(state, { payload }: PayloadAction<TSuccessResponse<TUser>>) => {
				state.user = payload.data;
				state.isAppUserAuth = true;
				state.isAppUserLoading = false;
			}
		);
		builder.addMatcher(usersApi.endpoints.getUser.matchRejected, state => {
			state.user = null;
			state.isAppUserAuth = false;
			state.isAppUserLoading = false;
		});
	}
});

export const { clearAppUser } = appUserSlice.actions;

export default appUserSlice.reducer;
