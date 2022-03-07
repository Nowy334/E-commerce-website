import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    city: "",
    business: "",
    postcode: "",
    comments: "",
    street: "",
  },
  reducers: {
    setData: (state: any, action: PayloadAction<any>) => {
      switch (action.payload.type) {
        case "firstName":
          state.firstName = action.payload.value;
          break;
        case "lastName":
          state.lastName = action.payload.value;
          break;
        case "phoneNumber":
          state.phoneNumber = action.payload.value;
          break;
        case "email":
          state.email = action.payload.value;
          break;
        case "street":
          state.street = action.payload.value;
          break;
        case "city":
          state.city = action.payload.value;
          break;
        case "postcode":
          state.postcode = action.payload.value;
          break;
        case "comments":
          state.comments = action.payload.value;
          break;
        case "buisness":
          state.buisness = action.payload.value;
          break;
      }
    },
    removeData(state: any) {
      state.firstName = "";
      state.lastName = "";
      state.phoneNumber = "";
      state.email = "";
      state.street = "";
      state.city = "";
      state.postcode = "";
      state.comments = "";
      state.buisness = "";
    },
  },
});

export const { setData, removeData } = formSlice.actions;

//export const selectCart = (state: RootState) => state.cart.cart

export default formSlice.reducer;
