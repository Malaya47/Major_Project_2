import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("loginToken") || null,
  loggedInUser: null,
};

export const userSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

// Action generators
export const { getLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
