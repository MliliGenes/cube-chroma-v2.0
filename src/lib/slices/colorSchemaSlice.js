import { createSlice } from "@reduxjs/toolkit";
import { SCHEMES, getInitCombo, getLastCombo } from "../utils";
let scheme =
  SCHEMES.indexOf(getInitCombo().scheme) !== -1
    ? getInitCombo()?.scheme
    : getLastCombo()?.scheme;
console.log("slice", scheme);
export const colorScheme = createSlice({
  name: "colorScheme",
  initialState: scheme,
  reducers: {
    upDateColorScheme: (state, action) => {
      return action.payload;
    },
  },
});

export const { upDateColorScheme } = colorScheme.actions;
export default colorScheme.reducer;
