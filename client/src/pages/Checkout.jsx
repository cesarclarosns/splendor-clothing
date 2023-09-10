import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  selectCartItems,
  selectCartTotal,
} from "../features/cart/cartSelectors";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import { ListItems } from "../pages/Cart";
import {
  Button,
  SimpleGrid,
  Spinner,
  VStack,
  Heading,
  Center,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";

import "@fontsource/inter";
import { Copy } from "@styled-icons/boxicons-regular";

const stripePromise = loadStripe(
  "pk_test_51KV5ZnJw2d9D8cf6MLmIlXicLHFaHHGJxBv5JvP0jCBuYP65AyRh8mPrbGcz1lbJl3du944gzc3eVMvKppwbmexd00FnJsiuyw"
);

// @styled-icons/boxicons-regular/Copy

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [clientSecret, setClientSecret] = useState("");
  const [creditCardNum] = useState(4242424242424242);
  const { onCopy } = useClipboard(creditCardNum);
  const toast = useToast();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios({
      url: "/api/create-payment-intent",
      method: "post",
      data: JSON.stringify({ amount: cartTotal * 100 }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.data)
      .then((data) => setClientSecret(data.clientSecret));
  }, [cartTotal]);

  React.useLayoutEffect(() => {
    toast({
      position: "bottom",
      render: () => (
        <VStack bgColor="gray.200" p="1rem" borderRadius="4px">
          <Button
            onClick={onCopy}
            colorScheme="teal"
            leftIcon={<Copy size="1rem" />}
          >
            Credit card number
          </Button>
          <Text>Try any CVC and valid Expiry</Text>
        </VStack>
      ),
    });
  }, []);

  const options = {
    clientSecret,
    appearance: {
      labels: "floating",
      theme: "flat",
      variables: {
        fontFamily: "Inter, sans-serif",
      },
    },
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
      },
    ],
  };

  return (
    <SimpleGrid columns={[1, 1, 2]} w="full" spacing="1rem">
      <VStack w="full">
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm w="full" />
          </Elements>
        ) : (
          <Spinner />
        )}
      </VStack>
      <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
    </SimpleGrid>
  );
};

function OrderSummary({ cartItems, cartTotal }) {
  return (
    <VStack w="full">
      <Heading fontSize="lg" textAlign="center" w="full">
        Order summary
      </Heading>
      <Text textAlign="center" w="full">
        Shipping cost: FREE
      </Text>
      <Text textAlign="center" w="full">
        Subtotal: ${cartTotal}
      </Text>
      <SimpleGrid>
        <Center>
          <ListItems cartItems={cartItems} display="none" />
        </Center>
      </SimpleGrid>
    </VStack>
  );
}

export default CheckoutPage;
