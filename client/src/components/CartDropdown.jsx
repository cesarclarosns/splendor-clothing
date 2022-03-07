import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems } from "../features/cart/cartSelectors";

import CartDropdownItem from "./CartDropdownItem";

import { VStack, Link, Center, Text } from "@chakra-ui/react";

const CartDropdown = ({ cartItems, onClose }) => {
  return (
    <VStack>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartDropdownItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <Center w="full" h="4rem">
          Your cart is empty,&nbsp;
          <Link onClick={onClose}>continue shopping!</Link>
        </Center>
      )}
    </VStack>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);
