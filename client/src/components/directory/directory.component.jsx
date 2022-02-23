import React from "react";

import MenuItem from "../menu-item/menu-item.component";
import { Center, Container, Grid } from "@chakra-ui/react";

const Directory = () => {
  const sections = [
    {
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      size: "large",
      id: 4,
      linkUrl: "womens",
      colSpan: 3,
    },
    {
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      size: "large",
      id: 5,
      linkUrl: "mens",
      colSpan: 3,
    },
    {
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      id: 1,
      linkUrl: "hats",
      colSpan: 2,
    },
    {
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      id: 2,
      linkUrl: "jackets",
      colSpan: 2,
    },
    {
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      id: 3,
      linkUrl: "sneakers",
      colSpan: 2,
    },
  ];

  return (
    <Container maxWidth="container.xl">
      <Center>
        <Grid
          pb={[null, "25px", "50px"]}
          pl={[null, "25px", "50px"]}
          pr={[null, "25px", "50px"]}
          width="full"
          templateRows={["repeat(5, 1fr)", null, "repeat(2, 1fr)"]}
          templateColumns={["1fr", null, "repeat(6, 1fr)"]}
          gap={4}
        >
          {sections.map(({ id, colSpan, ...otherSectionProps }) => (
            <MenuItem
              key={id}
              colStart="auto"
              colSpan={[1, null, colSpan]}
              collection={otherSectionProps}
              w="full"
              h="full"
            />
          ))}
        </Grid>
      </Center>
    </Container>
  );
};

export default Directory;
