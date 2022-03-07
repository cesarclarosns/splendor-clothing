import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import {
  Button,
  Spinner,
  Flex,
  Text,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    contact: "",
    countryOrRegion: "",
    firstName: "",
    lastName: "",
    adress: "",
    postalCode: "",
    city: "",
    state: "",
  });

  const {
    contact,
    countryOrRegion,
    firstName,
    lastName,
    adress,
    postalCode,
    city,
    state,
  } = shippingDetails;

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  function handleChange(event) {
    const { name, value } = event.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement something to save the order on Firebase

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payment/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <VStack
      as="form"
      id="payment-form"
      onSubmit={handleSubmit}
      w="full"
      flexDir="column"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <PaymentElement id="payment-element" />
          <Button
            type="submit"
            isDisabled={isLoading || !stripe || !elements}
            w="full"
          >
            Pay now
          </Button>
        </>
      )}

      {message && (
        <Text w="full" textAlign="center">
          {message}
        </Text>
      )}
      <ShippingDetails handleChange={handleChange} {...shippingDetails} />
    </VStack>
  );
};

function ShippingDetails(props) {
  const {
    handleChange,
    contact,
    countryOrRegion,
    firstName,
    lastName,
    adress,
    postalCode,
    city,
    state,
  } = props;

  return (
    <VStack w="full" pt="1rem" pb="1rem">
      <Heading fontSize="lg" pb="1rem">
        Shipping details
      </Heading>
      <FormControl isRequired w="full">
        <FormLabel>Email or phone number</FormLabel>
        <Input name="contact" value={contact} onChange={handleChange}></Input>
      </FormControl>
      <FormControl>
        <Checkbox w="full" defaultChecked>
          Email me with news and offers
        </Checkbox>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Country/region</FormLabel>
        <Select
          name="countryOrRegion"
          value={countryOrRegion}
          onChange={handleChange}
        >
          <option value="MX">Mexico</option>
          <option value="USA">United States</option>
        </Select>
      </FormControl>
      <SimpleGrid columns={2} w="full" spacing=".5rem">
        <FormControl isRequired>
          <FormLabel>First name</FormLabel>
          <Input
            name="firstName"
            value={firstName}
            onChange={handleChange}
          ></Input>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last name</FormLabel>
          <Input
            name="lastName"
            value={lastName}
            onChange={handleChange}
          ></Input>
        </FormControl>
      </SimpleGrid>
      <FormControl isRequired>
        <FormLabel>Street and house number</FormLabel>
        <Input name="adress" value={adress} onChange={handleChange}></Input>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Postal code</FormLabel>
        <Input
          name="postalCode"
          value={postalCode}
          onChange={handleChange}
        ></Input>
      </FormControl>

      <SimpleGrid columns={2} w="full" spacing=".5rem">
        <FormControl isRequired>
          <FormLabel>City</FormLabel>
          <Input name="city" value={city} onChange={handleChange}></Input>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>State</FormLabel>
          <Input name="state" value={state} onChange={handleChange}></Input>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
}

export default CheckoutForm;
