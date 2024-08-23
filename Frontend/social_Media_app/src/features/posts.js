import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      name: "Malaya",
      userName: "Malaya13",
      date: "Aug 21 2024",
      userContent: {
        text: "Hi there",
        image: "https://placehold.co/600x400",
      },
      likeCounter: 1,
      comment: 1,
    },
  ],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: (state, action) => {

      state.posts = [action.payload, ...state.posts];
    },
  },
});

// Action generators
export const { createPost } = postSlice.actions;

export default postSlice.reducer;
