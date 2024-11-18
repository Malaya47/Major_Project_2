import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
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
      query: () => `/user/670cbe08cb809542b91cf1c0/bookmarked/posts`,
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: `670cbe08cb809542b91cf1c0/post`,
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
        url: `/user/670cbe08cb809542b91cf1c0/delete/posts/${post._id}`,
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
        url: `670cbe08cb809542b91cf1c0/post/${post._id}/bookmark`,
        method: "POST",
      }),
    }),
    removeFromBookmark: builder.mutation({
      query: (post) => ({
        url: `user/remove-bookmark/670cbe08cb809542b91cf1c0/${post._id}`,
        method: "POST",
      }),
    }),
    followUser: builder.mutation({
      query: (user) => ({
        url: `profile/670cbe08cb809542b91cf1c0/${user._id}/follow`,
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
} = apiSlice;
