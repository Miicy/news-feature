import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	news: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAllNews: (state, action) => {
			state.news = action.payload;
		},
	},
	devTools: process.env.NODE_ENV !== "production",
});

export const { setAllNews } = userSlice.actions;

export const selectAllNews = (state) => state.user.news;

export default userSlice.reducer;
