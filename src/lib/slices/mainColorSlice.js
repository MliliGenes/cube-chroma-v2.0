import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import { getInitCombo, getLastCombo } from "../utils";

function generateGoodLookingColor() {
  // const goldenRatio = 0.618033988749895;
  const hue = Math.random() % 1;
  const saturation = 0.4 + Math.random() * 0.4;
  const minLightness = 0.3;
  const maxLightness = 0.5;
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
