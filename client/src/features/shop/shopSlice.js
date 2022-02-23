import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    collections: null,
    isFetching: false,
    isFetched: false,
  },
  reducers: {
    fetchCollectionsStart: (state) => {
      state.isFetching = true;
    },
    fetchCollectionsSuccess: (state, action) => {
      state.collections = action.payload;
      state.isFetching = false;
      state.isFetched = true;
    },
    fetchCollectionsFailure: (state) => {
      state.isFetching = false;
      state.isFetched = false;
    },
  },
});

export const {
  fetchCollectionsStart,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} = shopSlice.actions;

export default shopSlice.reducer;
