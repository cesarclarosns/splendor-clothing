import React from "react";
import { Link } from "react-router-dom";

import "./menu-item.styles.scss";

import { Box } from "@chakra-ui/react";

const capitalize = (word) => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
};

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
  return (
    <Link to={`/shop/${linkUrl}`}>
      <Box bgImage={`url(${imageUrl})`}>
        <div>
          <h1>{capitalize(title)}</h1>
          <span>Shop Now</span>
        </div>
      </Box>
    </Link>
  );
};

export default MenuItem;

{
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
}
