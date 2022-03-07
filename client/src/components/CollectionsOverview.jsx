import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCollectionsForPreview,
  selectIsCollectionsFetched,
} from "../features/shop/shopSelectors";

import { Spinner } from "@chakra-ui/react";
import CollectionPreview from "./CollectionPreview";

function CollectionsOverview({ collections, isFetched }) {
  return (
    <div>
      {isFetched ? (
        collections.map((collection) => (
          <CollectionPreview key={collection.id} {...collection} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
  isFetched: selectIsCollectionsFetched,
});

export default connect(mapStateToProps)(CollectionsOverview);
