import React from "react";
import { useSelector } from "react-redux";

import { selectCartItemsCount } from "../features/cart/cartSelectors";

import { Center, Badge, Tooltip, Box } from "@chakra-ui/react";
import { ShoppingCart } from "@styled-icons/feather";

const CartDropdownToggle = React.forwardRef((props, ref) => {
  const { size, ...rest } = props;
  const itemsCount = useSelector(selectCartItemsCount);

  return (
    <Box {...rest} ref={ref}>
      <Tooltip hasArrow label="Open a preview of your cart">
        <Center pos="relative">
          <Badge
            colorScheme="blackAlpha"
            variant="solid"
            zIndex={1}
            pos="absolute"
            top="-5px"
            right="-5px"
          >
            {itemsCount}
          </Badge>
          <ShoppingCart size={size} />
        </Center>
      </Tooltip>
    </Box>
  );
});

export default CartDropdownToggle;
