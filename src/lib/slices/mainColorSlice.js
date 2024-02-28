import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import { generateGoodLookingColor, getInitCombo, getLastCombo } from "../utils";

let color = chroma.valid(getInitCombo().color)
  ? getInitCombo().color
  : getLastCombo().color;

export const mainColorSlice = createSlice({
  name: "mainColor",
  initialState: {
    color: color,
  },
  reducers: {
    generateMainColor: (state) => {
      state.color = generateGoodLookingColor();
    },
    setMainColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { generateMainColor, setMainColor } = mainColorSlice.actions;
export default mainColorSlice.reducer;
