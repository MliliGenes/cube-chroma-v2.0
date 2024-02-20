import { createSlice } from "@reduxjs/toolkit";
import generateRandomPalette from "../utils";
import { GetColorName } from "hex-color-to-color-name";

let localdb = JSON.parse(localStorage.getItem("cubePalettes")) || [];

export const colorPalette = createSlice({
  name: "colorPalette",
  initialState: [],
  reducers: {
    generateColorPalette: (state, action) => {
      let newPalette = generateRandomPalette(
        action.payload.color,
        action.payload.method
      );

      localdb.push(newPalette);

      localStorage.setItem("cubePalettes", JSON.stringify(localdb));

      let colorRoles = ["text", "background", "primary", "accent", "secondary"];
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
  },
});

export const { generateColorPalette } = colorPalette.actions;
export default colorPalette.reducer;
