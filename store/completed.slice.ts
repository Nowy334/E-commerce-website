import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const completedSlice = createSlice({
  name: "completed",
  initialState: {
    completed: false,
  },
  reducers: {
    changeCompleted: (state: any, action: PayloadAction<any>) => {
      return action.payload.value;
    },
  },
});

export const { changeCompleted } = completedSlice.actions;

//export const selectCart = (state: RootState) => state.cart.cart

export default completedSlice.reducer;
