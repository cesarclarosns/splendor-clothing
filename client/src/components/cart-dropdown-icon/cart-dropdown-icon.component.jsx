import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { cartToggleHidden } from "../../features/cart/cartSlice";
import { selectCartItemsCount } from "../../features/cart/cartSelectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-dropdown-icon.styles.scss";

const CartDropdownIcon = () => {
  const itemCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();

  console.log("CART ICON");

  return (
    <div className="cart-icon" onClick={() => dispatch(cartToggleHidden())}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartDropdownIcon;
