import { createSlice, createAction } from "@reduxjs/toolkit";

// userSlice
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    error: null,
  },
  reducers: {
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
    },
    signUpSuccess: (state) => {
      state.error = null;
    },
  },
});

// Additional actions
export const checkUserSession = createAction("user/checkUserSession");
export const googleSignInStart = createAction("user/googleSignInStart");
export const emailSignInStart = createAction("user/emailSignInStart");
export const signOutStart = createAction("user/signOutStart");
export const signUpStart = createAction("user/signUpStart");

export const {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
} = userSlice.actions;

export default userSlice.reducer;
