import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const MenuItem = ({ children, isLast, to, currentUser = true, ...rest }) => {
  return currentUser ? (
    <Link to={to}>
      <Text as="button" d="block" {...rest}>
        {children}
      </Text>
    </Link>
  ) : null;
};

export default MenuItem;
