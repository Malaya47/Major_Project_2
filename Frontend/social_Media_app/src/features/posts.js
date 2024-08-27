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
      bookmarked: true,
      comment: 4,
    },
  ],
  likedPosts: [],
  bookmarkPosts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    likeCount: (state, action) => {
      const foundPost = state.posts.find(
        (post) => post.postId === action.payload.postId
      );

      if (foundPost) {
        foundPost.like.liked = !foundPost.like.liked; // Toggle the liked state
        foundPost.like.liked
          ? foundPost.like.counter++
          : foundPost.like.counter--; // Adjust the counter
      }
    },
    likedPost: (state, action) => {
      const foundPost = state.posts.find(
        (post) => post.postId === action.payload.postId
      );

      if (foundPost) {
        if (foundPost.like.liked) {
          // Add the post to likedPosts if it's liked
          if (
            !state.likedPosts.some((post) => post.postId === foundPost.postId)
          ) {
            state.likedPosts.push(foundPost);
          }
        } else {
          // Remove the post from likedPosts if it's unliked
          state.likedPosts = state.likedPosts.filter(
            (post) => post.postId !== foundPost.postId
          );
        }
      }
    },
    bookmarkPost: (state, action) => {
      // Find the post in the posts array using the postId from the action payload
      const foundPost = state.posts.find(
        (post) => post.postId === action.payload.postId
      );

      // If the post is found
      if (foundPost) {
        // Toggle the bookmarked status of the post
        foundPost.bookmarked = !foundPost.bookmarked;

        if (foundPost.bookmarked) {
          // If the post is now bookmarked, add it to the bookmarkPosts array
          state.bookmarkPosts.push(foundPost);
        } else {
          // If the post is no longer bookmarked, remove it from the bookmarkPosts array
          state.bookmarkPosts = state.bookmarkPosts.filter(
            (post) => post.postId !== action.payload.postId
          );
        }
      }
    },
  },
});

// Action generators
export const { createPost, likeCount, likedPost, bookmarkPost } =
  postSlice.actions;

export default postSlice.reducer;
