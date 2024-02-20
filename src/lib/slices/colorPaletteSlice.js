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
      let colorRoles = ["text", "background", "primary", "accent", "secondary"];

      return newPalette.map((colorhex, index) => ({
        color: colorhex,
        name: GetColorName(colorhex.replace("#", "")),
        isLocked: false,
        isPickerActive: false,
        role: colorRoles[index],
      }));
    },
  },
});

export const { generateColorPalette } = colorPalette.actions;
export default colorPalette.reducer;