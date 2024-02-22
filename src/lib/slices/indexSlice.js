import { createSlice } from "@reduxjs/toolkit";
import { getIndex } from "../utils";

export const index = createSlice({
  name: "index",
  initialState: getIndex() || 0,
  reducers: {
    upDateIndex: (state, action) => {
      return action.payload;
    },
    increment: (state) => {
      return state + 1;
    },
    increment: (state) => {
      return state + 1;
    },
    decrement: (state) => {
      return state - 1;
    },
  },
});

export const { upDateIndex, increment, decrement } = index.actions;
export default index.reducer;
