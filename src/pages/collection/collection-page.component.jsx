import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../features/shop/shopSelectors";
import "./collection-page.styles.scss";

const CollectionPage = () => {
  const params = useParams();
  const collectionName = params.id;
  const collection = useSelector(selectCollection(collectionName));

  return (
    <div className="collection-page">
      <h2 className="title">{collection.title}</h2>
      <div className="items">
        {collection.items.map((item) => (
          <CollectionItem
            key={item.id}
            item={item}
            collectionId={collection.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
