import React from "react";

import "./collection-item.styles.scss";

import CustomButton from "../custom-button/custom-button.component";

import { useDispatch } from "react-redux";
import { cartAddItem } from "../../features/cart/cartSlice";

const CollectionItem = ({ item, collectionId }) => {
  const { imageUrl, name, price } = item;

  const dispatch = useDispatch();

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <CustomButton
        onClick={() => dispatch(cartAddItem({ ...item, collectionId }))}
        inverted
      >
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
