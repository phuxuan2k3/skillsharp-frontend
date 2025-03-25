import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';
import LocalStorageService from '../../services/localstorage.service.ts';
import authApi from '../../features/Auth/authApi.ts';
import { bulbasaur } from '../../features/Auth/api/bulbasaur.ts';
import { Role } from '../enum.ts';

export type UserInfo = {
	username: string;
    email: string;
    role: string;
    id: string;
    metadata: any;
}

export type Token = {
	access_token: string;
	refresh_token: string;
	role: bulbasaur.Role;
	safe_id: string;
	user_id: number;
}

export interface AuthState {
	user: UserInfo | null,
	tokens: Token | null,
};

export interface AuthStateResponse {
	user: UserInfo | null,
	tokens: Token | null,
}

const initialState: AuthState = ((): AuthState => {
	return {
		user: null,
		tokens: null,
	}
})();

function _setAuthState(state: AuthState, action: PayloadAction<AuthStateResponse>) {
	state.tokens = action.payload.tokens;
	state.user = action.payload.user;
	LocalStorageService.setAuthState(state);
}

function _clearAuthState(state: AuthState) {
	state.user = null;
	state.tokens = null;
	LocalStorageService.clearAuthState();
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuthState: _clearAuthState,
		setAuthState: _setAuthState,
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addMatcher(
				authApi.endpoints.login.matchFulfilled,
				(state, action) => {
					_setAuthState(state, action);
				})

			// Register
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, action) => {
					_setAuthState(state, action);
				})

			// Refresh
			.addMatcher(
				authApi.endpoints.refresh.matchFulfilled,
				(state, action) => {
					_setAuthState(state, action);
				})
			.addMatcher(
				authApi.endpoints.refresh.matchRejected,
				(state) => {
					_clearAuthState(state);
				}
			)

			// Logout
			.addMatcher(
				(action) =>
					authApi.endpoints.logout.matchFulfilled(action) ||
					authApi.endpoints.logout.matchRejected(action),
				(state) => {
					_clearAuthState(state); // Todo: clear again needed?
					console.log('Logout completed');
				})
	},
});

/**
 * Since the app startup, the tokens are loaded from the local storage and being verified with auth/refresh endpoint and being reduced to the authSlice (if valid) or set null in the authSlice. Therefore, tokens in authSlice are 100% valid, NOT the ones in localStorage.
 */
export const selectIsAuthenticated = (state: RootState) => state.auth.tokens != null && state.auth.user != null;

export const selectUserInfo = (state: RootState) => {
	const user = state.auth.user;
	if (user == null) {
		throw new Error("User is null");
	}
	return user;
}

export const selectTokens = (state: RootState) => state.auth.tokens;

export const selectRole = (state: RootState): Role => {
	const _role = state.auth.tokens?.role;
	if (_role == null) {
		return Role.None;
	}
	switch (_role) {
		case bulbasaur.Role.ROLE_CANDIDATE:
			return Role.Candidate;
		case bulbasaur.Role.ROLE_BUSINESS_MANAGER:
			return Role.Manager;
		case bulbasaur.Role.ROLE_UNKNOWN:
			return Role.None;
	}
}

export const { clearAuthState, setAuthState } = authSlice.actions;

export default authSlice.reducer;