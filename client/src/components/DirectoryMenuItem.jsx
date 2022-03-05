import React from "react";
import { Link } from "react-router-dom";

import { Box, GridItem, Image, Heading, Text } from "@chakra-ui/react";

const MenuItem = React.forwardRef((props, ref) => {
  const { title, imageUrl, linkUrl } = props.collection;

  return (
    <GridItem {...props} ref={ref} pos="relative">
      <Link to={`/shop/${linkUrl}`}>
        <Image
          h="full"
          src={imageUrl}
          objectFit="cover"
          _hover={{
            filter: "auto",
            blur: "3px",
          }}
        />
        <Box
          d="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          h="90px"
          w="180px"
          p="0 25px"
          bgColor="white"
          pos="absolute"
          zIndex={1}
          left="50%"
          ml="-90px"
          top="50%"
          _hover={{
            opacity: "0.5",
          }}
        >
          <Heading>{title.toUpperCase()}</Heading>
          <Text>Shop now</Text>
        </Box>
      </Link>
    </GridItem>
  );
});

export default MenuItem;
