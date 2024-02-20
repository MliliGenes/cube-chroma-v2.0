import { createSlice } from "@reduxjs/toolkit";

export const colorScheme = createSlice({
  name: "colorScheme",
  initialState: "analogous",
  reducers: {
    upDateColorScheme: (state, action) => {
      return action.payload;
    },
  },
});

export const { upDateColorScheme } = colorScheme.actions;
export default colorScheme.reducer;
