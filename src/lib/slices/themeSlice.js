import { createSlice } from "@reduxjs/toolkit";
import { getInitCombo, getLastCombo } from "../utils";

export const theme = createSlice({
  name: "theme",
  initialState:
    getInitCombo().theme == "light" || getInitCombo().theme == "dark"
      ? getInitCombo().theme
      : getLastCombo()?.theme,
  reducers: {
    toggleTheme: (state) => {
      return state === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      return action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = theme.actions;
export default theme.reducer;
