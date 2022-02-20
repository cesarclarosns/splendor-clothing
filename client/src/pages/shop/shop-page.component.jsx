import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchCollectionsStart } from "../../features/shop/shopSlice";

const ShopPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  return <Outlet />;
};

export default ShopPage;
