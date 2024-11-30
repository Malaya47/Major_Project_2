import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  endpoints: (builder) => ({
    getProfileUser: builder.query({
      query: (id) => `profileUser/${id}`,
    }),
    getUserProfile: builder.query({
      query: (name) => `userProfile/${name}`,
    }),
    getAllUsers: builder.query({
      query: () => `users`,
    }),
    getAllPosts: builder.query({
      query: () => `users/posts`,
    }),
    getBookmarkedPosts: builder.query({
      query: () => `/user/${localStorage.getItem("userId")}/bookmarked/posts`,
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: `${newPost?.userId}/post`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editPost: builder.mutation({
      query: (editedPostDetails) => ({
        url: `posts/editPost/${editedPostDetails._id}`,
        method: "PUT",
        body: editedPostDetails,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deletePost: builder.mutation({
      query: (post) => ({
        url: `/user/${localStorage.getItem("userId")}/delete/posts/${post._id}`,
        method: "DELETE",
      }),
    }),
    likePost: builder.mutation({
      query: (post) => ({
        url: `posts/like/${post._id}`,
        method: "POST",
      }),
    }),
    unlikePost: builder.mutation({
      query: (post) => ({
        url: `posts/unlike/${post._id}`,
        method: "POST",
      }),
    }),
    bookmarkPost: builder.mutation({
      query: (post) => ({
        url: `${localStorage.getItem("userId")}/post/${post._id}/bookmark`,
        method: "POST",
      }),
    }),
    removeFromBookmark: builder.mutation({
      query: (post) => ({
        url: `user/remove-bookmark/${localStorage.getItem("userId")}/${
          post._id
        }`,
        method: "POST",
      }),
    }),
    followUser: builder.mutation({
      query: (user) => ({
        url: `profile/${localStorage.getItem("userId")}/${user._id}/follow`,
        method: "POST",
      }),
    }),
    searchUser: builder.query({
      query: (name) => `search/user/${name}`,
    }),
    registerUser: builder.mutation({
      query: (userDetails) => ({
        url: `register`,
        method: "POST",
        body: userDetails,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    loginUser: builder.mutation({
      query: (userDetails) => ({
        url: `login`,
        method: "POST",
        body: userDetails,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    editUser: builder.mutation({
      query: (updatedUser) => ({
        url: `profile/updateProfile/${updatedUser._id}`,
        method: "Put",
        body: updatedUser,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetProfileUserQuery,
  useGetAllUsersQuery,
  useGetAllPostsQuery,
  useGetBookmarkedPostsQuery,
  useGetUserProfileQuery,
  useEditPostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useBookmarkPostMutation,
  useRemoveFromBookmarkMutation,
  useFollowUserMutation,
  useSearchUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useEditUserMutation,
} = apiSlice;
