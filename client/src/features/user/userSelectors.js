import { createSelector } from "@reduxjs/toolkit";

const selectUser = (state) => state.user;

// Selectors

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectCartId = createSelector([selectCurrentUser], (currentUser) =>
  currentUser ? currentUser.cartId : null
);
