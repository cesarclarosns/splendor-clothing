import React, { useEffect } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import CheckoutPage from "./pages/checkout/checkout-page.component";
import HomePage from "./pages/home/home-page.component";
import ShopPage from "./pages/shop/shop-page.component";
import SignInPage from "./pages/sign-in/sign-in-page.component";
import SignUpPage from "./pages/sign-up/sign-up-page.component";
import Header from "./components/header/header.component";
import CollectionsOverviewContainer from "./components/collections-overview/collections-overview.container";
import CollectionPageContainer from "./pages/collection/collection-page.container";
import NotFound from "./pages/not-found/not-found-page.component";

import Directory from "./components/directory/directory.component";

// RTK
import { useDispatch, useSelector } from "react-redux";
import { checkUserSession } from "./features/user/userSlice";
import { selectCurrentUser } from "./features/user/userSelectors";

// App
const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <ChakraProvider>
      <React.StrictMode>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index="index" element={<Directory />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="shop" element={<ShopPage />}>
                <Route
                  index="index"
                  element={<CollectionsOverviewContainer />}
                />
                <Route path=":id" element={<CollectionPageContainer />} />
              </Route>
              <Route
                path="signin"
                element={currentUser ? <Navigate to="/" /> : <SignInPage />}
              />
              <Route
                path="signup"
                element={currentUser ? <Navigate to="/" /> : <SignUpPage />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </React.StrictMode>
    </ChakraProvider>
  );
};

export default App;
