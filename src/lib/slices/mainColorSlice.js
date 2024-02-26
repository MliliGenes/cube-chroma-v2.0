import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import { getInitCombo, getLastCombo } from "../utils";

function generateGoodLookingColor() {
  const hue = Math.random();
  const saturation = 0.75 + Math.random() * 0.25;
  const minLightness = 0.5;
  const maxLightness = 0.601;
  const lightness =
    minLightness + Math.random() * (maxLightness - minLightness);
  return chroma.hsl(hue * 360, saturation, lightness).hex();
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
