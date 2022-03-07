// Main theme entry point
import { extendTheme } from "@chakra-ui/react";
import { components } from "./components";

const fonts = {
  heading: "'Inter', sans-serif",
  body: "Inter, sans-serif",
};

const styles = {
  global: {
    "#payment-form": {
      width: "100%",
    },
    "#payment-element": {
      width: "100%",
    },
  },
};

const theme = extendTheme({
  fonts,
  components,
  styles,
});

export default theme;
