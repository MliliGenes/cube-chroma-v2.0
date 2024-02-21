import { createSlice } from "@reduxjs/toolkit";
import { getLastTheme } from "../utils";

export const theme = createSlice({
  name: "theme",
  initialState: getLastTheme(),
  reducers: {
    toggleTheme: (state) => {
      return state === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = theme.actions;
export default theme.reducer;
