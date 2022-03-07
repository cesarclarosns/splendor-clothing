import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectCartItems,
  selectCartTotal,
} from "../features/cart/cartSelectors";

import CartItem from "../components/CartItem";
import {
  Box,
  Center,
  Heading,
  Flex,
  VStack,
  SimpleGrid,
  Grid,
  HStack,
  Text,
  Button,
  GridItem,
} from "@chakra-ui/react";

function CartPage({ cartItems, cartTotal }) {
  return !cartItems.length ? (
    <EmptyCart />
  ) : (
    <>
      <Heading>Your cart</Heading>
      <SimpleGrid w="full" columns={[1, 1, 2]} mt="2rem">
        <Center>
          <ListItems cartItems={cartItems}></ListItems>
        </Center>

        <Details cartTotal={cartTotal}></Details>
      </SimpleGrid>
    </>
  );
}

function EmptyCart() {
  return (
    <Flex
      w="full"
      h="100%"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading>Your cart is empty</Heading>
      <Text>Continue shopping!</Text>
    </Flex>
  );
}

export function ListItems({ cartItems, display }) {
  return (
    <Grid
      templateColumns="minmax(180px, 250px) minmax(120px, 180px)"
      gap="1rem"
    >
      <GridItem w="full">
        <Heading fontSize="md">Product details</Heading>
      </GridItem>
      <GridItem w="full">
        <Heading fontSize="md" textAlign="right">
          Quantity x price
        </Heading>
      </GridItem>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} display={display} />
      ))}
    </Grid>
  );
}

function Details({ cartTotal }) {
  let navigate = useNavigate();

  return (
    <VStack w="full" p={["2rem", "2rem", "0rem"]}>
      <Heading fontSize="xl">Order summary</Heading>
      <VStack w="full" alignItems="center">
        <Text>Checkout currency: USD $</Text>
        <Text>Your items total: ${cartTotal}</Text>
        <Text>Delivery cost calculated at the next step</Text>
        <Button
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Proceed to checkout
        </Button>
      </VStack>
    </VStack>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(CartPage);
