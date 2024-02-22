import { configureStore } from "@reduxjs/toolkit";
import mainColorSlice from "../slices/mainColorSlice";
import colorPaletteSlice from "../slices/colorPaletteSlice";
import colorSchemaSlice from "../slices/colorSchemaSlice";
import themeSlice from "../slices/themeSlice";
import indexSlice from "../slices/indexSlice";

export const store = configureStore({
  reducer: {
    mainColor: mainColorSlice,
    colorPalette: colorPaletteSlice,
    colorScheme: colorSchemaSlice,
    theme: themeSlice,
    index: indexSlice,
  },
});
