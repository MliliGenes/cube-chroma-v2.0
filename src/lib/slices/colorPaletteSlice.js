import { createSlice } from "@reduxjs/toolkit";
import generateRandomPalette from "../utils";
import { GetColorName } from "hex-color-to-color-name";

export const colorPalette = createSlice({
  name: "colorPalette",
  initialState: [],
  reducers: {
    generateColorPalette: (state, action) => {
      let newPalette = generateRandomPalette(
        action.payload.color,
        action.payload.method
      );

      return newPalette.map((colorhex) => ({
        color: colorhex,
        name: GetColorName(colorhex.replace("#", "")),
        isLocked: false,
        isPickerActive: false,
      }));
    },
  },
});

export const { generateColorPalette } = colorPalette.actions;
export default colorPalette.reducer;
