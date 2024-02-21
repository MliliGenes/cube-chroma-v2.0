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

      let colorRoles = ["text", "background", "primary", "secondary", "accent"];
      if (state) {
        return newPalette.map((colorhex, index) => ({
          color: colorhex,
          name: GetColorName(colorhex.replace("#", "")),
          isLocked: false,
          isPickerActive: false,
          role: colorRoles[index],
        }));
      } else {
        return state.map(c, (i) => ({
          color: newPalette[i],
          name: GetColorName(colorhex.replace("#", "")),
          isLocked: c.isLocked,
          isPickerActive: c.isPickerActive,
          role: c.role,
        }));
      }
    },
    toggleTheme: (state) => {
      return [state[1], state[0], state[2], state[3], state[4]];
    },
  },
});

export const { generateColorPalette, toggleTheme } = colorPalette.actions;
export default colorPalette.reducer;
