import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  error: false,
  isFetched: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
    },
    cartClearItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    },
    cartClearCart: (state) => {
      state.cartItems = [];
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
  },
});

export const cartFetchStart = createAction("cart/cartFetchStart");

export const {
  cartAddItem,
  cartRemoveItem,
  cartClearItem,
  cartClearCart,
  cartFetchSuccess,
  cartFetchFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
