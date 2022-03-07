import React from "react";

import { Box, Text } from "@chakra-ui/react";

function Failure() {
  return (
    <Box w="full" mt="2rem">
      <Text w="full" textAlign="center">
        Your payment has not been successfully processed! An error occurred!
      </Text>
    </Box>
  );
}

export default Failure;
