import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state: any, action: PayloadAction<any>) => {
      let itemExists: any;
      if (action.payload.product.sys.contentType.sys.id === "body") {
        itemExists = state.find(
          (item: any) =>
            item.fields?.size === action.payload.product.fields.size
        );
      } else {
        itemExists = state.find(
          (item: any) => item.sys.id === action.payload.product.sys.id
        );
      }
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({
          ...action.payload.product,
          quantity: action.payload.quantity,
        });
      }
    },
    incrementQuantity: (state: any, action: PayloadAction<any>) => {
      let item: any;
      if (action.payload.sys.contentType.sys.id === "body") {
        item = state.find(
          (item: any) => item.fields?.size === action.payload.fields.size
        );
      } else {
        item = state.find((item: any) => item.sys.id === action.payload.sys.id);
      }
      item.quantity++;
    },
    decrementQuantity: (state: any, action: PayloadAction<any>) => {
      let item: any;
      if (action.payload.sys.contentType.sys.id === "body") {
        item = state.find(
          (item: any) => item.fields?.size === action.payload.fields.size
        );
      } else {
        item = state.find((item: any) => item.sys.id === action.payload.sys.id);
      }
      if (item.quantity === 1) {
        // const index = state.findIndex((item: any) => item.sys.id === action.payload.sys.id);
        // state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state: any, action: PayloadAction<any>) => {
      let index: any;
      if (action.payload.sys.contentType.sys.id === "body") {
        index = state.findIndex(
          (item: any) => item.fields?.size === action.payload.fields.size
        );
      } else {
        index = state.findIndex(
          (item: any) => item.sys.id === action.payload.sys.id
        );
      }
      state.splice(index, 1);
    },
    removeAllFromCart: (state: any) => {
      return [];
    },
    updateQuantity: (state: any, action: PayloadAction<any>) => {
      let item: any;
      if (action.payload.product.sys.contentType.sys.id === "body") {
        item = state.find(
          (item: any) =>
            item.fields?.size === action.payload.product.fields.size
        );
        if (action.payload.item < 1) {
          const index = state.findIndex(
            (item: any) =>
              item.fields?.size === action.payload.product.fields.size
          );
          state.splice(index, 1);
        } else {
          item.quantity = action.payload.item;
        }
      } else {
        item = state.find(
          (item: any) => item.sys.id === action.payload.product.sys.id
        );
        if (action.payload.item < 1) {
          const index = state.findIndex(
            (item: any) => item.sys.id === action.payload.product.sys.id
          );
          state.splice(index, 1);
        } else {
          item.quantity = action.payload.item;
        }
      }
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  removeAllFromCart,
  updateQuantity,
} = cartSlice.actions;

//export const selectCart = (state: RootState) => state.cart.cart

export default cartSlice.reducer;
