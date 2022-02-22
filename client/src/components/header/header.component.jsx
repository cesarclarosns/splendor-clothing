import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartDropdownIcon from "../cart-dropdown-icon/cart-dropdown-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { signOutStart } from "../../features/user/userSlice";

import {
  Button,
  Container,
  Flex,
  Spacer,
  Box,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <HStack>
        <Box color="tomato">
          <Link className="logo-container" to="/">
            <Logo className="logo" />
          </Link>
        </Box>
      </HStack>
      <Spacer />
      <HStack spacing={5}>
        <Box>
          <Link className="option" to="/shop">
            Shop
          </Link>
        </Box>
        <Box>
          <Link className="option" to="/shop">
            Contact
          </Link>
        </Box>
        {currentUser ? (
          <Box>
            <Link
              className="option"
              to="/"
              onClick={() => dispatch(signOutStart())}
            >
              Sign Out
            </Link>
          </Box>
        ) : (
          <Box>
            <Link className="option" to="/signin">
              Sign In
            </Link>
          </Box>
        )}
        {!currentUser ? (
          <Box>
            <Link className="option" to="/signup">
              Sign Up
            </Link>
          </Box>
        ) : null}

        <CartDropdownIcon as="button" onClick={onOpen} />

        <Modal
          scrollBehavior="inside"
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay bg="blackAplha.300" backdropFilter="blur(10px)" />
          <ModalContent>
            <ModalBody>
              <CartDropdown />
            </ModalBody>
            <ModalFooter>
              <Button w="full">Go to Bag</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    </Flex>
  );
};

export default Header;
