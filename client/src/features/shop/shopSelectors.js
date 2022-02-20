import { createSelector } from "@reduxjs/toolkit";

const selectShop = (state) => state.shop;

// Selectors
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectIsCollectionsFetched = createSelector(
  [selectShop],
  (shop) => shop.isFetched
);
