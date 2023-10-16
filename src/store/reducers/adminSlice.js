import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
	name: "admin",
	initialState: {
		isLoggedIn: false,
	},
	reducers: {
		adminLogin(state) {
			state.isLoggedIn = true;
		},
		adminLogout(state) {
			state.isLoggedIn = false;
		},
	},
});

export const { adminLogin, adminLogout } = adminSlice.actions;

export const selectIsAdminLoggedIn = (state) => state.admin.isLoggedIn;

export default adminSlice.reducer;
