import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts";
import { apiSlice } from "../features/apiSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
