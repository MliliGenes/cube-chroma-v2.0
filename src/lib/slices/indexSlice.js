import { createSlice } from "@reduxjs/toolkit";
import { getLength } from "../utils";

export const index = createSlice({
  name: "index",
  initialState: getLength() - 1 || 0,
  reducers: {
    upDateIndex: (state, action) => {
      return getLength() - 1;
    },
    increment: (state) => {
      return state + 1;
    },
    decrement: (state) => {
      return state - 1 >= 0 ? state - 1 : 0;
    },
  },
});

export const { upDateIndex, increment, decrement } = index.actions;
export default index.reducer;
