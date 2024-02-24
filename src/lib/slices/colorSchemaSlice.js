import { createSlice } from "@reduxjs/toolkit";
import { getInitCombo, getLastCombo } from "../utils";
let allSchemes = [
  "analogous",
  "complementary",
  "monochromatic",
  "split Complementary",
  "square",
  "triadic",
];
export const colorScheme = createSlice({
  name: "colorScheme",
  initialState:
    allSchemes.indexOf(getInitCombo().scheme) !== -1
      ? getInitCombo().scheme
      : getLastCombo().scheme,
  reducers: {
    upDateColorScheme: (state, action) => {
      return action.payload;
    },
  },
});

export const { upDateColorScheme } = colorScheme.actions;
export default colorScheme.reducer;
