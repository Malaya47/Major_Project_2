import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // status: "idle",
  // error: null,
  // userProfile: null,

  posts: [
    {
      postId: "id-001",
      date: "Aug 21 2024",
      userContent: {
        text: "Hi there",
        image: "https://placehold.co/600x400",
      },
      like: { liked: true, counter: 7 },
      comment: 4,
    },
  ],
  likedPosts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    likeCount: (state, action) => {
      // console.log(action.payload.postId);
      const foundPost = state.posts.find(
        (post) => post.postId === action.payload.postId
      );

      if (foundPost) {
        if (foundPost.like.liked) {
          foundPost.like.counter -= 1; // Unlike the post
        } else {
          foundPost.like.counter += 1;
        }
        foundPost.like.liked = !foundPost.like.liked;
      }
    },
    likedPost: (state, action) => {
      const isLiked = action?.payload?.like?.liked;
      const postId = action.payload.postId;
      
      if (isLiked) {
        // Add the post to likedPosts if it's liked
        if (!state.likedPosts.some(post => post.postId === postId)) {
          state.likedPosts.push(action.payload);
        }
      } else {
        // Remove the post from likedPosts if it's unliked
        state.likedPosts = state.likedPosts.filter(post => post.postId !== postId);
      }
    },
  },
});

// Action generators
export const { createPost, likeCount, likedPost } = postSlice.actions;

export default postSlice.reducer;
