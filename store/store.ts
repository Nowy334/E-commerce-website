import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart.slice";
import { loadState } from "./browser-storage";
import formReducer from "./form.slice";
import totalPriceSlice from "./totalPrice.slice";
import completedSlice from "./completed.slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    form: formReducer,
    totalPrice: totalPriceSlice,
    completed: completedSlice,
  },
  preloadedState: loadState(),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
