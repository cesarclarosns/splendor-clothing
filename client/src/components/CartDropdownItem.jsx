import React from "react";

import { Box, HStack, Image, Text } from "@chakra-ui/react";

const CartDropdownItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <Box w="full">
    <HStack
      d="flex"
      w="full"
      flexDir="row"
      justifyContent="space-between"
      mb="11px"
    >
      <Box>
        <Image
          src={imageUrl}
          boxSize="4.5rem"
          minW="4.5rem"
          objectFit="cover"
          alt="Item"
        />
      </Box>
      <Box d="flex" flexDir="column" textAlign="end">
        <Text>{name}</Text>
        <Text>
          {quantity} x ${price}
        </Text>
      </Box>
    </HStack>
    <hr></hr>
  </Box>
);

export default CartDropdownItem;
