import { configureStore } from "@reduxjs/toolkit";
import mainColorSlice from "../slices/mainColorSlice";
import colorPaletteSlice from "../slices/colorPaletteSlice";

export const store = configureStore({
  reducer: {
    mainColor: mainColorSlice,
    colorPalette: colorPaletteSlice,
  },
});
