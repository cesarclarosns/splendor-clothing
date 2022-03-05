import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
} from "../features/cart/cartSelectors";

import CartItem from "../components/CartItem";
import { Box, Heading, Flex, VStack, SimpleGrid, Grid } from "@chakra-ui/react";

function CartPage({ cartItems, cartTotal }) {
  return !cartItems.length ? (
    <EmptyCart />
  ) : (
    <>
      <Heading textAlign="center" mb="2rem">
        Your cart
      </Heading>

      <SimpleGrid spacing="1rem" p="4rem">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </SimpleGrid>

      <Heading>TOTAL: ${cartTotal}</Heading>
    </>
  );
}

function EmptyCart() {
  return (
    <>
      <Heading>Your cart is empty</Heading>
      <Box>Continue shopping!</Box>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(CartPage);
