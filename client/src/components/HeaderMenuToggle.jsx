import React from "react";
import { Box, Center } from "@chakra-ui/react";

import { Menu } from "@styled-icons/feather";
import { Close } from "@styled-icons/evil";

const HeaderMenuToggle = React.forwardRef((props, ref) => {
  const { isOpen, size, ...rest } = props;

  return (
    <Box {...rest} ref={ref}>
      <Center>{isOpen ? <Close size={size} /> : <Menu size={size} />}</Center>
    </Box>
  );
});

export default HeaderMenuToggle;
