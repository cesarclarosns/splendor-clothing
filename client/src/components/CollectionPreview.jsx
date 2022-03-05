import React, { useLayoutEffect, useRef, useState } from "react";

import CollectionItem from "./CollectionItem";
import { Grid, Heading, Flex, Text } from "@chakra-ui/react";

const CollectionPreview = (props) => {
  const { id, items, title } = props;
  const itemsCount = items.length;
  const gridW = itemsCount * 13.5 - 1.5;

  const [gridCW, setGridCW] = useState();
  const [x, setX] = useState(0);
  const gridRef = useRef();
  const gridCWRef = useRef();

  useLayoutEffect(() => {
    setGridCW(gridRef.current.clientWidth / 16);
    window.addEventListener("resize", () => {
      getGridCW();
    });
  }, []);

  function getGridCW() {
    if (gridRef) {
      const newGridCW = gridRef.current.clientWidth / 16;
      setGridCW(newGridCW);

      if (!gridCWRef.current) {
        gridCWRef.current = newGridCW;
      }

      if (newGridCW < gridCWRef.current) {
        gridCWRef.current = newGridCW;
      } else {
        setX((x) => (x > 0 ? x - (newGridCW - gridCWRef.current) : 0));
        gridCWRef.current = newGridCW;
      }
    }
  }

  function prevX() {
    setX((x) => {
      const diff = gridW - gridCW;

      if (x === 0) {
        return diff;
      } else if (x - 2 * 13.5 < 0) {
        return 0;
      } else {
        return x - 13.5;
      }
    });
  }

  function nextX() {
    setX((x) => {
      const diff = gridW - gridCW;

      if (x < diff && x + 2 * 13.5 > diff) {
        return diff;
      } else if (x >= diff) {
        return 0;
      } else {
        return x + 13.5;
      }
    });
  }

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${x}rem`,
  };

  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "11rem",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  return (
    <>
      <Heading>{title.toUpperCase()}</Heading>
      <Flex w="full" ref={gridRef}>
        <Flex w="full" overflow="hidden" pos="relative">
          <Grid
            w="100%"
            mt="1rem"
            mb="1rem"
            templateColumns={`repeat(${items.length}, 12rem)`}
            gap="1.5rem"
            pos="relative"
            {...carouselStyle}
          >
            {items.map((item) => (
              <CollectionItem key={item.id} item={item} collectionId={id} />
            ))}
          </Grid>
          <Text {...arrowStyles} left="0" onClick={prevX}>
            &#10094;
          </Text>
          <Text {...arrowStyles} right="0" onClick={nextX}>
            &#10095;
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default CollectionPreview;
