import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	TAppUserState,
	TIsAppUserLoadingPayload,
	TSetAppUserPayload
} from '@/slices';

const initialState: TAppUserState = {
	appUser: null,
	isAppUserAuth: true,
	isAppUserLoading: false
};

export const appUserSlice = createSlice({
	name: 'appUser',
	initialState,
	reducers: {
		setAppUser: (
			state,
			{ payload: { isUserAuth, user } }: PayloadAction<TSetAppUserPayload>
		) => {
			state.appUser = user;
			state.isAppUserAuth = isUserAuth;
			state.isAppUserLoading = false;
		},
		clearAppUser: state => {
			state.appUser = null;
			state.isAppUserAuth = false;
		},
		setIsAppUserLoading: (
			state,
			{ payload: { isUserLoading } }: PayloadAction<TIsAppUserLoadingPayload>
		) => {
			state.isAppUserLoading = isUserLoading;
		}
	}
});

export const { setAppUser, setIsAppUserLoading, clearAppUser } =
	appUserSlice.actions;

export default appUserSlice.reducer;
