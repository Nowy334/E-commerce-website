import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const snippetsSlice = createSlice({
  name: "snippets",
  initialState: [] as any[],
  reducers: {
    addSnippets: (state: any, action: PayloadAction<any>) => {
      if (action.payload.items) {
        action.payload.items.forEach((el: any) => {
          state.push(el);
        });
      }
    },
  },
});

export const { addSnippets } = snippetsSlice.actions;

//export const selectCart = (state: RootState) => state.cart.cart

export default snippetsSlice.reducer;
