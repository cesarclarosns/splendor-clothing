import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  error: false,
  hasChanged: false,
  hidden: true,
  isFetched: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartToggleHidden: (state) => {
      state.hidden = !state.hidden;
    },
    cartAddItem: {
      reducer(state, action) {
        const existingCartItem = state.cartItems.find(
          (cartItem) => cartItem.id === action.payload.id
        );

        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          state.cartItems.push(action.payload);
        }
        state.hasChanged = true;
      },
      prepare(cartItem) {
        const { id, name, price, imageUrl, collectionId } = cartItem;

        return {
          payload: {
            id: id,
            name: name,
            price: price,
            imageUrl: imageUrl,
            quantity: 1,
            collectionId,
          },
        };
      },
    },
    cartRemoveItem: (state, action) => {
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (existingCartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
      } else {
        existingCartItem.quantity--;
      }

      state.hasChanged = true;
    },
    cartClearItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      state.hasChanged = true;
    },
    cartClearCart: (state) => {
      state.cartItems = [];
      state.hasChanged = false;
      state.hidden = true;
      state.isFetched = false;
    },
    cartFetchSuccess: (state, action) => {
      state.cartItems = action.payload;
      state.isFetched = true;
      state.error = false;
    },
    cartFetchFailure: (state) => {
      state.error = true;
    },
    cartSaveCart: (state) => {
      state.hasChanged = false;
    },
  },
});

export const cartFetchStart = createAction("cart/cartFetchStart");

export const {
  cartToggleHidden,
  cartAddItem,
  cartRemoveItem,
  cartClearItem,
  cartClearCart,
  cartFetchSuccess,
  cartFetchFailure,
  cartSaveCart,
} = cartSlice.actions;

export default cartSlice.reducer;
