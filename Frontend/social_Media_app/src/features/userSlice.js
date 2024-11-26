import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendingOrLatest: "latest",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getTreandingOrLatestPosts: (state, action) => {
       state.trendingOrLatest = action.payload;
    }
  },
});

// Action generators
export const { getTreandingOrLatestPosts } = userSlice.actions;

export default userSlice.reducer;
