import React from "react";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  selectCartItems,
  selectHasChanged,
} from "../../features/cart/cartSelectors";
import { selectCartId } from "../../features/user/userSelectors";
import { cartToggleHidden, cartSaveCart } from "../../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const hasChanged = useSelector(selectHasChanged);
  const cartId = useSelector(selectCartId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          dispatch(cartToggleHidden());
          navigate("/checkout");
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
      <CustomButton
        onClick={() => {
          dispatch(cartSaveCart({ cartItems, hasChanged, cartId }));
        }}
      >
        SAVE
      </CustomButton>
    </div>
  );
};

export default CartDropdown;
