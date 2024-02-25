import { createSlice } from "@reduxjs/toolkit";
import generateRandomPalette, {
  getInitCombo,
  getLastCombo,
  switchPalettetheme,
} from "../utils";
import { GetColorName } from "hex-color-to-color-name";

let colorRoles = ["text", "background", "primary", "secondary", "accent"];

export const colorPalette = createSlice({
  name: "colorPalette",
  initialState: getInitCombo().palette || JSON.parse(getLastCombo()?.palette),
  reducers: {
    generateColorPalette: (state, action) => {
      let newPalette = generateRandomPalette(
        action.payload.color,
        action.payload.method,
        action.payload.theme
      );

      if (state.filter((c) => c.isLocked).length === 5) {
        return state;
      }

      return newPalette.map((colorhex, index) => {
        let newState = [...state];

        newState[index] = newState[index] || {};

        let newColor = {
          color: colorhex,
          isLocked: false,
          role: colorRoles[index],
        };

        newState[index] = newState[index].isLocked ? newState[index] : newColor;

        return newState[index];
      });
    },
    upDateColorPalette: (state, action) => {
      let oldStateIsLocked = state.map((c) => c.isLocked);

      let newPalette = switchPalettetheme(action.payload.theme, [
        state[0].color,
        state[1].color,
        state[2].color,
        state[3].color,
        state[4].color,
      ]);

      return newPalette.map((colorhex, index) => ({
        color: colorhex,
        isLocked: oldStateIsLocked[index],
        role: colorRoles[index],
      }));
    },
    upDateLockState: (state, action) => {
      let roleToUpdDate = action.payload;

      let updatedPalette = state.map((color) => {
        if (color.role == roleToUpdDate) {
          let newColor = {
            color: color.color,
            isLocked: !color.isLocked,
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

export const { generateColorPalette, upDateColorPalette, upDateLockState } =
  colorPalette.actions;
export default colorPalette.reducer;
