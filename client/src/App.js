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

// // Pages
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import Directory from "./components/Directory";
import Collections from "./components/CollectionsOverview";
import Collection from "./components/Collection";

import { ChakraProvider, Container } from "@chakra-ui/react";

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Container maxWidth="container.lg" h="100%" pb="1rem">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index="index" element={<Directory />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="contact" element={<Contact />} />
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
            </Route>
          </Routes>
        </Container>
      </Router>
    </ChakraProvider>
  );
};

export default App;
