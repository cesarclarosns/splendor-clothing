import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import CheckoutForm from "../components/CheckoutForm";

import {
  selectCartItems,
  selectCartTotal,
} from "../features/cart/cartSelectors";

import { Button } from "@chakra-ui/react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51KV5ZnJw2d9D8cf6MLmIlXicLHFaHHGJxBv5JvP0jCBuYP65AyRh8mPrbGcz1lbJl3du944gzc3eVMvKppwbmexd00FnJsiuyw"
);

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios({
      url: "http://localhost:4242/create-payment-intent",
      method: "post",
      data: JSON.stringify({ amount: cartTotal * 100 }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.data)
      .then((data) => setClientSecret(data.clientSecret));
  }, [cartTotal]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="checkout-page">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </div>
  );
};

export default CheckoutPage;
