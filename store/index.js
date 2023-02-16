import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import postsReducer from "./reducers/postsReducer";
import productsReducer from "./reducers/productsReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    products: productsReducer,
  },
});
