import React from "react";
import { useSelector } from "react-redux";

import { selectCartItemsCount } from "../../features/cart/cartSelectors";

import { AiOutlineShopping } from "react-icons/ai";
import { Box, Icon, Badge, Tooltip } from "@chakra-ui/react";

const CartDropdownIcon = React.forwardRef((props, ref) => {
  const itemsCount = useSelector(selectCartItemsCount);

  return (
    <Box pos="relative" {...props} ref={ref}>
      <Badge
        colorScheme="gray"
        variant="solid"
        zIndex={1}
        pos="absolute"
        top="-5px"
        right="-5px"
      >
        {itemsCount}
      </Badge>
      <Tooltip label="Open your Bag">
        <span>
          <Icon as={AiOutlineShopping} boxSize="27px" />
        </span>
      </Tooltip>
    </Box>
  );
});

export default CartDropdownIcon;
