import React from "react";
import { useSelector } from "react-redux";

import CartItem from "../../components/cart-item/cart-item.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../features/cart/cartSelectors";

import "./cart-page.styles.scss";

import { Button } from "@chakra-ui/react";

const EmptyCart = () => {
  return (
    <div>
      <h1>Your Cart</h1>
      <h2>Your cart is empty.</h2>
      <Button>Continue Shopping</Button>
    </div>
  );
};

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return !cartItems.length ? (
    <EmptyCart />
  ) : (
    <div className="checkout-page">
      <h1>Your cart</h1>

      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="total">TOTAL: ${cartTotal}</div>
    </div>
  );
};

export default CartPage;
