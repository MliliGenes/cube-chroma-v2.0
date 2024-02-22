import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import { getLastColor } from "../utils";

function generateGoodLookingColor() {
  const goldenRatio = 0.618033988749895;
  const hue = ((Math.random() + goldenRatio) % 1).toFixed(2);
  const saturation = 1;
  const minLightness = 0.5;
  const maxLightness = 0.8;
  const lightness =
    minLightness + Math.random() * (maxLightness - minLightness);
  return chroma.hsl(hue * 360, saturation, lightness).hex();
}

let color = getLastColor();

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
