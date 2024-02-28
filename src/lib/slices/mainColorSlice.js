import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import { getInitCombo, getLastCombo } from "../utils";

function generateGoodLookingColor() {
  const hue = Math.floor(Math.random() * 361);
  const saturation = Math.floor(40 + Math.random() * 40) / 100;
  const lightness = Math.floor(45 + Math.random() * 25) / 100;
  return chroma.hsl(hue, saturation, lightness).hex();
}

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
