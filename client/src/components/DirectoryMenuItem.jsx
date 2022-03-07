import React from "react";
import { Link } from "react-router-dom";

import { Box, GridItem, Image, Heading, Text } from "@chakra-ui/react";

const MenuItem = React.forwardRef((props, ref) => {
  const { title, imageUrl, linkUrl } = props.collection;

  return (
    <GridItem {...props} ref={ref} pos="relative" role="group">
      <Link to={`/shop/${linkUrl}`}>
        <Image
          h="full"
          boxSize="full"
          src={imageUrl}
          objectFit="cover"
          transition="all .5s"
          _groupHover={{
            filter: "hue-rotate(3.142rad)",
            blur: "2px",
          }}
        />
        <Box
          d="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          h="80px"
          w="200px"
          p="0 25px"
          bgColor="white"
          opacity={0.6}
          pos="absolute"
          zIndex={1}
          left="50%"
          ml="-90px"
          top="50%"
          _groupHover={{
            opacity: "0.9",
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
