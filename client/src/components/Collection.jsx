import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectCollection,
  selectIsCollectionsFetched,
} from "../features/shop/shopSelectors";

import CollectionItem from "../components/CollectionItem";
import { Heading, Grid, Spinner } from "@chakra-ui/react";

const CollectionPage = () => {
  const { id } = useParams();
  const collection = useSelector(selectCollection(id));
  const isFetched = useSelector(selectIsCollectionsFetched);

  return isFetched ? (
    <>
      <Heading>{collection.title.toUpperCase()}</Heading>
      <Grid
        w="full"
        mt="1rem"
        mb="1rem"
        gap="1.5rem"
        transition="all .5s"
        templateColumns="repeat(auto-fit, minmax(10rem, 1fr))"
      >
        {collection.items.map((item) => (
          <CollectionItem
            key={item.id}
            item={item}
            collectionId={collection.id}
          />
        ))}
      </Grid>
    </>
  ) : (
    <Spinner />
  );
};

export default CollectionPage;
