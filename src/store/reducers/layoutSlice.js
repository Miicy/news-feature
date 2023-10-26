import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    screenSize: "large", 
  },
  reducers: {
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
  },
});

export const { setScreenSize } = layoutSlice.actions;


export const selectScreenSize = (state) => state.layout.screenSize;

export default layoutSlice.reducer;