import React from "react";
import { useDispatch } from "react-redux";

import {
  cartClearItem,
  cartAddItem,
  cartRemoveItem,
} from "../features/cart/cartSlice";
import { Close } from "@styled-icons/evil";

import {
  Flex,
  Image,
  Box,
  HStack,
  Center,
  useToast,
  Text,
  GridItem,
} from "@chakra-ui/react";

const CartItem = ({ item, display }) => {
  const { name, imageUrl, price, quantity } = item;
  const dispatch = useDispatch();
  const toast = useToast();

  function cartToast(description, status) {
    return toast({
      description: description,
      status: status,
      duration: 2500,
    });
  }

  return (
    <>
      <GridItem w="full">
        <Flex flexDir="row">
          <Box position="relative" role="group">
            <Image
              src={imageUrl}
              objectFit="cover"
              alt="item"
              boxSize="4.8rem"
              minW="4.8rem"
              _groupHover={{
                filter: "hue-rotate(90deg)",
              }}
            />
            <Box
              d={display}
              bgColor="gray.100"
              opacity={0}
              as="button"
              onClick={() => {
                dispatch(cartClearItem(item));
                cartToast("Item cleared from your cart!", "error");
              }}
              position="absolute"
              top="50%"
              left="50%"
              w="2.5rem"
              h="2rem"
              transform="translate(-50%, -50%)"
              _groupHover={{
                opacity: 0.7,
                filter: "drop-shadow(0 0 0.75rem black)",
              }}
            >
              <Close size="1.7rem"></Close>
            </Box>
          </Box>
          <Flex flexDir="column" h="100%" w="full" m="auto" ml="1rem">
            <Text w="full" textAlign="left">
              {name}
            </Text>
            <Text w="full" textAlign="left">
              Size: M
            </Text>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex
          flexDir="column"
          h="100%"
          w="100%"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Text>
            {quantity} x ${price}
          </Text>
          <HStack d={display}>
            <Center
              as="button"
              onClick={() => {
                dispatch(cartRemoveItem(item));
                cartToast("Item removed from your cart!", "warning");
              }}
            >
              &#10094;
            </Center>
            <Center
              as="button"
              onClick={() => {
                dispatch(cartAddItem({ ...item }));
                cartToast("Item added to your cart", "success");
              }}
            >
              &#10095;
            </Center>
          </HStack>
        </Flex>
      </GridItem>
    </>
  );
};

export default CartItem;
