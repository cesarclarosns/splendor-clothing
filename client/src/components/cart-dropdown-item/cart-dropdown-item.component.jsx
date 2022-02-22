import React from "react";

import { Box, HStack, Image, Text } from "@chakra-ui/react";

const CartDropdownItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <HStack d="flex" w="full" flexDir="row" justifyContent="space-between">
    <Box>
      <Image
        src={imageUrl}
        boxSize="75px"
        minW="75px"
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
);

export default CartDropdownItem;
