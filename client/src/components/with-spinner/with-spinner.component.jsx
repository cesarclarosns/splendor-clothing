import React from "react";

import { Spinner } from "@chakra-ui/react";

const WithSpinner =
  (WrappedComponent) =>
  ({ isLoaded, ...otherProps }) => {
    return !isLoaded ? (
      <Spinner size="xl" />
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

export default WithSpinner;
