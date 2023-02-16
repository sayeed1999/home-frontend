import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(authSlice.middleware),
});
