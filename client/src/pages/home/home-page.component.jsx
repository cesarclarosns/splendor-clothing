import React from "react";
import { Outlet } from "react-router-dom";

import "./home-page.styles.scss";

const HomePage = () => (
  <>
    <Outlet />
  </>
);

export default HomePage;
