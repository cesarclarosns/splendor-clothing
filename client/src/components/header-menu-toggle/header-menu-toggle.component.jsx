import React from "react";
import { Box } from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const HeaderMenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon w="25px" h="25px" />}
    </Box>
  );
};

export default HeaderMenuToggle;
