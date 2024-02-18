import { configureStore } from "@reduxjs/toolkit";
import mainColorSlice from "../slices/mainColorSlice";

export const store = configureStore({
  reducer: {
    mainColor: mainColorSlice,
  },
});
