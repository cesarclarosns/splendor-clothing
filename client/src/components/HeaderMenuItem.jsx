import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";

function MenuItem({ children, to, currentUser = true, ...rest }) {
  let navigate = useNavigate();

  return currentUser ? (
    <Box>
      <Button
        onClick={navigate(`/${to}`)}
        {...rest}
        w="180px"
        h="2rem"
        borderRadius="0.35rem"
      >
        {children}
      </Button>
    </Box>
  ) : null;
}

export default MenuItem;
