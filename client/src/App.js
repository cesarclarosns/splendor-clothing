import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { checkUserSession } from "./features/user/userSlice";
import { selectCurrentUser } from "./features/user/userSelectors";

// Pages
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";

import Header from "./components/Header";
import Directory from "./components/Directory";
import Collections from "./components/CollectionsOverview";
import Collection from "./components/Collection";
import PaymentFailure from "./components/PaymentFailure";
import PaymentSuccess from "./components/PaymentSuccess";

// Theme
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "./theme";
import "@fontsource/inter";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Container maxWidth="container.lg" h="100%" pb="1rem">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index="index" element={<Directory />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="shop" element={<Shop />}>
                <Route index="index" element={<Collections />} />
                <Route path=":id" element={<Collection />} />
              </Route>
              <Route
                path="signin"
                element={currentUser ? <Navigate to="/" /> : <SignIn />}
              />
              <Route
                path="signup"
                element={currentUser ? <Navigate to="/" /> : <SignUp />}
              />
              <Route path="*" element={<NotFound />} />
              <Route path="payment" element={<Payment />}>
                <Route path="failure" element={<PaymentFailure />} />
                <Route path="success" element={<PaymentSuccess />} />
              </Route>
            </Route>
          </Routes>
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;
