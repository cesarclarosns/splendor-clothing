import React from "react";
import { useSelector } from "react-redux";

import { selectCartItems } from "../features/cart/cartSelectors";

import CartDropdownItem from "./CartDropdownItem";

import { VStack } from "@chakra-ui/react";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  return (
    <VStack>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartDropdownItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your bag is empty</span>
      )}
    </VStack>
  );
};

export default CartDropdown;
