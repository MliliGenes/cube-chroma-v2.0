import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";

export const mainColorSlice = createSlice({
  name: "mainColor",
  initialState: {
    color: chroma
      .hsl(
        Math.random() * 360,
        0.7 + Math.random() * 0.3,
        0.4 + Math.random() * 0.4
      )
      .hex(),
  },
  reducers: {
    generateMainColor: (state) => {
      state.color = chroma
        .hsl(
          Math.random() * 360,
          0.7 + Math.random() * 0.3,
          0.4 + Math.random() * 0.4
        )
        .hex();
    },
  },
});

export const { generateMainColor } = mainColorSlice.actions;
export default mainColorSlice.reducer;
