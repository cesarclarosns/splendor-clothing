import React from "react";
import { useDispatch } from "react-redux";

import {
  cartClearItem,
  cartAddItem,
  cartRemoveItem,
} from "../features/cart/cartSlice";
import { Close } from "@styled-icons/evil";

import {
  SimpleGrid,
  GridItem,
  Image,
  Box,
  HStack,
  VStack,
  Flex,
  Center,
  Text,
} from "@chakra-ui/react";

const CartItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  const dispatch = useDispatch();

  return (
    <SimpleGrid columns={3} w="full">
      <Center>
        <Box w="8rem" position="relative" role="group">
          <Image
            src={imageUrl}
            objectFit="cover"
            alt="item"
            w="full"
            _groupHover={{
              filter: "hue-rotate(90deg)",
            }}
          />
          <Box
            bgColor="gray.100"
            opacity={0}
            as="button"
            onClick={() => dispatch(cartClearItem(item))}
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
      </Center>
      <Center>
        <VStack w="full">
          <Center>{name}</Center>
          <Center>
            <HStack>
              <Center
                as="button"
                onClick={() => dispatch(cartRemoveItem(item))}
              >
                &#10094;
              </Center>
              <Center>{quantity}</Center>
              <Center
                as="button"
                onClick={() => dispatch(cartAddItem({ ...item }))}
              >
                &#10095;
              </Center>
            </HStack>
          </Center>
        </VStack>
      </Center>

      <Center>${price}</Center>
    </SimpleGrid>
  );
};

export default CartItem;
