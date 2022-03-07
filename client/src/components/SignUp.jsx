import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";

import { signUpStart } from "../features/user/userSlice";

import {
  Button,
  Flex,
  Input,
  Link,
  FormControl,
  FormLabel,
  VStack,
  Text,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";

const SignUp = () => {
  const dispatch = useDispatch();
  const [userCredenials, setUserCredenials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userCredenials;

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    dispatch(signUpStart({ displayName, email, password }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUserCredenials({ ...userCredenials, [name]: value });
  }

  return (
    <Flex flexDir="column" alignItems="center">
      <VStack as="form" onSubmit={handleSubmit} w="22rem" spacing="1rem">
        <Text pb="1rem" fontSize="lg" w="full" textAlign="center">
          Sign up with your email
        </Text>
        <FormControl isRequired>
          <FormLabel>Display name</FormLabel>
          <Input
            placeholder="First-name last-name"
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl isRequired w="full">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="email@adress.com"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </FormControl>
        <SimpleGrid w="full" columns={2} spacing="1rem">
          <GridItem w="full">
            <FormControl isRequired w="full">
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="********"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem w="full">
            <FormControl isRequired>
              <FormLabel>Confirm password</FormLabel>
              <Input
                placeholder="********"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </FormControl>
          </GridItem>
        </SimpleGrid>
        <Button type="submit" w="full">
          Sign up
        </Button>
        <Text textAlign="center" w="full">
          <Link as={LinkRouter} to="/signin">
            Already have an account or want to sign in with Google?
          </Link>
        </Text>
      </VStack>
    </Flex>
  );
};

export default SignUp;
