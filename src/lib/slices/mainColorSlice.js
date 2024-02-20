import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";

function generateGoodLookingColor() {
  const goldenRatio = 0.618033988749895;
  const hue = (Math.random() + goldenRatio) % 1;
  const saturation = 1;
  const minLightness = 0.6;
  const maxLightness = 0.9;
  const lightness =
    minLightness + Math.random() * (maxLightness - minLightness);

  return chroma.hsl(hue * 360, saturation, lightness).hex();
}

export const mainColorSlice = createSlice({
  name: "mainColor",
  initialState: {
    color: generateGoodLookingColor(),
  },
  reducers: {
    generateMainColor: (state) => {
      state.color = generateGoodLookingColor();
    },
  },
});

export const { generateMainColor } = mainColorSlice.actions;
export default mainColorSlice.reducer;
