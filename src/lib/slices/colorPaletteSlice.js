import { createSlice } from "@reduxjs/toolkit";
import generateRandomPalette from "../utils";
import { GetColorName } from "hex-color-to-color-name";

export const colorPalette = createSlice({
  name: "colorPalette",
  initialState: [],
  reducers: {
    generateColorPalette: (state, action) => {
      console.log(action.payload.theme);

      let newPalette = generateRandomPalette(
        action.payload.color,
        action.payload.method,
        action.payload.theme
      );

      let colorRoles = ["text", "background", "primary", "secondary", "accent"];

      // return newPalette.map((colorhex, index) => ({
      //   color: colorhex,
      //   name: GetColorName(colorhex.replace("#", "")),
      //   isLocked: false,
      //   isPickerActive: false,
      //   role: colorRoles[index],
      // }));

      if (state.filter((c) => c.isLocked).length === 5) {
        return state;
      }

      return newPalette.map((colorhex, index) => {
        let newState = [...state];

        newState[index] = newState[index] || {};

        let newColor = {
          color: colorhex,
          name: GetColorName(colorhex.replace("#", "")),
          isLocked: false,
          isPickerActive: newState[index].isPickerActive,
          role: colorRoles[index],
        };

        newState[index] = newState[index].isLocked ? newState[index] : newColor;

        return newState[index];
      });
    },
    upDateLockState: (state, action) => {
      let roleToUpdDate = action.payload;

      let updatedPalette = state.map((color) => {
        if (color.role == roleToUpdDate) {
          let newColor = {
            color: color.color,
            name: GetColorName(color.color.replace("#", "")),
            isLocked: !color.isLocked,
            isPickerActive: false,
            role: color.role,
          };
          return newColor;
        } else {
          return color;
        }
      });

      return updatedPalette;
    },
  },
});

export const { generateColorPalette, upDateLockState } = colorPalette.actions;
export default colorPalette.reducer;
