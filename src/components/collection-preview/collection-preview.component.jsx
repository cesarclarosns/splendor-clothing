import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items, id }) => {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} collectionId={id} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
