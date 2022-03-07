import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const totalPriceSlice = createSlice({
  name: "form",
  initialState: {
    totalPrice: 0,
    shipment: {
      type: "",
      price: 0,
    },
  },
  reducers: {
    setTotalPriceData: (state: any, action: PayloadAction<any>) => {
      state.totalPrice = action.payload.value;
    },
    setShipmentData: (state: any, action: PayloadAction<any>) => {
      state.shipment.type = action.payload.type;
      state.shipment.price = action.payload.price;
    },
    removeShipmentData: (state: any) => {
      state.totalPrice = 0;
      state.shipment.type = "";
      state.shipment.price = 0;
    },
  },
});

export const { setTotalPriceData, setShipmentData, removeShipmentData } =
  totalPriceSlice.actions;

//export const selectCart = (state: RootState) => state.cart.cart

export default totalPriceSlice.reducer;
