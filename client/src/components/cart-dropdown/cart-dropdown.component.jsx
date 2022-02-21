import React from "react";

import CustomButton from "../custom-button/custom-button.component";
import CartDropdownItem from "../cart-dropdown-item/cart-dropdown-item.component";

import { selectCartItems } from "../../features/cart/cartSelectors";

import { cartToggleHidden } from "../../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartDropdownItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          dispatch(cartToggleHidden());
          navigate("/cart");
        }}
      >
        GO TO CART
      </CustomButton>
    </div>
  );
};

export default CartDropdown;
