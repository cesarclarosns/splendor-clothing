import { combineReducers } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import directoryReducer from "../features/directory/directorySlice";
import shopReducer from "../features/shop/shopSlice";
import userReducer from "../features/user/userSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  user: userReducer,
});

export default rootReducer;
