import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts";

export default configureStore({
  reducer: {
    posts: postReducer,
  },
});
