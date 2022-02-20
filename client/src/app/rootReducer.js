import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import shopReducer from "../features/shop/shopSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  shop: shopReducer,
});

export default rootReducer;
