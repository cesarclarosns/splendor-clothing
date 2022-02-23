import React from "react";
import { Link } from "react-router-dom";

import { Box, GridItem, Image, Heading, Text } from "@chakra-ui/react";

const capitalizeWord = (word) => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
};

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
          <Heading>{capitalizeWord(title)}</Heading>
          <Text>Shop Now</Text>
        </Box>
      </Link>
    </GridItem>
  );
});

export default MenuItem;

// <AspectRatio maxW="400px" ratio={4 / 3}>
//   <Image src={`url(${imageUrl})`} objectFit="cover"></Image>
//   {/* <Link to={`/shop/${linkUrl}`}>
//           <Box
//             h="100%"
//             bgImage={`url(${imageUrl})`}
//             backgroundPosition="center"
//           >
//             <div>
//               <Box as="button" bgColor="tomato">
//                 <h1>{capitalize(title)}</h1>
//                 <span>Shop Now</span>
//               </Box>
//             </div>
//           </Box>
//         </Link> */}
// </AspectRatio>;
// {
/* <Link to={`/shop/${linkUrl}`} className={`${size} menu-item`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="content">
        <h1 className="title">{capitalize(title)}</h1>
        <span className="subtitle">Shop Now</span>
      </div>
    </Link> */
