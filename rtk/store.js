import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import chatSlice from "./features/chatSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [chatSlice.reducerPath]: chatSlice.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(authSlice.middleware, chatSlice.middleware),
});
