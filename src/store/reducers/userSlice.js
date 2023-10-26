import { createSlice } from "@reduxjs/toolkit";

export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    theme: "light",
  },
  reducers: {
    setThemeMode(state, action) {
      if (state.theme === THEME_MODES.LIGHT) {
        state.theme = THEME_MODES.DARK;
      } else {
        state.theme = THEME_MODES.LIGHT;
      }
    },
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const { setThemeMode } = userSlice.actions;

export const selectActiveTheme = (state) => state.user.theme;

export default userSlice.reducer;
