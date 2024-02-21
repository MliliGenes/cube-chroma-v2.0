import { createSlice } from "@reduxjs/toolkit";
import { getLastScheme } from "../utils";

export const colorScheme = createSlice({
  name: "colorScheme",
  initialState: getLastScheme(),
  reducers: {
    upDateColorScheme: (state, action) => {
      return action.payload;
    },
  },
});

export const { upDateColorScheme } = colorScheme.actions;
export default colorScheme.reducer;
