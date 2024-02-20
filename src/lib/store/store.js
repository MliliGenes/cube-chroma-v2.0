import { configureStore } from "@reduxjs/toolkit";
import mainColorSlice from "../slices/mainColorSlice";
import colorPaletteSlice from "../slices/colorPaletteSlice";
import colorSchemaSlice from "../slices/colorSchemaSlice";

export const store = configureStore({
  reducer: {
    mainColor: mainColorSlice,
    colorPalette: colorPaletteSlice,
    colorScheme: colorSchemaSlice,
  },
});
