import { createSelector } from "@reduxjs/toolkit";

const selectDirectory = (state) => state.directory;

// Selectors
export const selectSections = createSelector(
  [selectDirectory],
  (directory) => directory.sections
);
