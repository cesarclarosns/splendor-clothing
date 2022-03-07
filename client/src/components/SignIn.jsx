import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";

import {
  emailSignInStart,
  googleSignInStart,
} from "../features/user/userSlice";

import {
  Button,
  Flex,
  Input,
  Link,
  FormControl,
  FormLabel,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Google } from "@styled-icons/boxicons-logos";

const SignIn = () => {
  const dispatch = useDispatch();

  const [userCredenials, setUserCredenials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredenials;

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setUserCredenials({ ...userCredenials, [name]: value });
  }

  return (
    <Flex flexDir="column" alignItems="center">
      <VStack as="form" onSubmit={handleSubmit} w="22rem" spacing="1rem">
        <Text pb="1rem" fontSize="lg" w="full" textAlign="center">
          Sign in with your email or with Google
        </Text>
        <FormControl w="full" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="email@adress.com "
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          ></Input>
        </FormControl>
        <FormControl w="full" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="********"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          ></Input>
        </FormControl>

        <Button w="full" type="submit" p={2}>
          Sign in
        </Button>
        <Button
          w="full"
          type="submit"
          p={2}
          leftIcon={<Google size="1.6rem" />}
          onClick={() => dispatch(googleSignInStart())}
        >
          Sign in with Google
        </Button>

        <Text textAlign="center" w="full">
          Don't have an account yet?{" "}
          <Link as={LinkRouter} to="/signup">
            Sign up with your email
          </Link>
        </Text>
      </VStack>
    </Flex>
  );
};

const styles = {
  flex: {
    container: {},
    child: {},
  },
  button: {
    google: {},
  },
};

export default SignIn;
