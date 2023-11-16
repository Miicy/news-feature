import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
  },
  reducers: {
  },
  devTools: process.env.NODE_ENV !== "production",
});



export default userSlice.reducer;
