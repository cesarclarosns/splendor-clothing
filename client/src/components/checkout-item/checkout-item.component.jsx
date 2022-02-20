import React from "react";
import { useDispatch } from "react-redux";

import {
  cartClearItem,
  cartAddItem,
  cartRemoveItem,
} from "../../features/cart/cartSlice";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  const dispatch = useDispatch();

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => dispatch(cartRemoveItem(item))}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => dispatch(cartAddItem({ ...item }))}
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => dispatch(cartClearItem(item))}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
