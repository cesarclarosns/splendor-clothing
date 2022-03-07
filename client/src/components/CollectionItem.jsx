import React from "react";
import { useDispatch } from "react-redux";

import { cartAddItem } from "../features/cart/cartSlice";

import { Box, Flex, GridItem, Image, useToast } from "@chakra-ui/react";
import { Add } from "@styled-icons/ionicons-solid";

const CollectionItem = ({ item, collectionId }) => {
  const { imageUrl, name, price } = item;

  const toast = useToast();
  const dispatch = useDispatch();

  return (
    <GridItem w="full">
      <Box w="full">
        <Box w="full" position="relative" role="group">
          <Image
            src={imageUrl}
            objectFit="cover"
            w="full"
            h="22rem"
            _groupHover={{
              filter:
                "hue-rotate(3.142rad) drop-shadow(16px 16px 20px #b3b3b3)",
            }}
          ></Image>
          <Box
            bgColor="gray.100"
            opacity={0}
            as="button"
            onClick={() => {
              dispatch(cartAddItem({ ...item, collectionId }));
              toast({
                description: "Item added to your cart!",
                status: "success",
                duration: 2500,
                isClosable: true,
              });
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
            <Add size="1.7rem" />
          </Box>
        </Box>
        <Flex p="0.7rem" justifyContent="space-between" alignContent="center">
          <Box p="0.2rem">{name}</Box>
          <Box p="0.2rem">${price}</Box>
        </Flex>
      </Box>
    </GridItem>
  );
};

export default CollectionItem;
