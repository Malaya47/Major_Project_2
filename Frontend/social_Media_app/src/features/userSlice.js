import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendingOrLatest: "latest",
  file: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getTreandingOrLatestPosts: (state, action) => {
      state.trendingOrLatest = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    }
  },
});

// Action generators
export const { getTreandingOrLatestPosts, setFile } = userSlice.actions;

export default userSlice.reducer;
