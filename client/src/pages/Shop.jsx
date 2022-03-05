import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { fetchCollectionsStart } from "../features/shop/shopSlice";

const ShopPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionsStart());
    console.log("Fetching collections triggered.");
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ShopPage;
