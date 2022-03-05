import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../features/user/userSelectors";
import { signOutStart } from "../features/user/userSlice";

import CartDropdownToggle from "./CartDropdownToggle";
import CartDropdown from "./CartDropdown";
import HeaderMenuToggle from "./HeaderMenuToggle";
import HeaderMenuItem from "./HeaderMenuItem";

import { ReactComponent as Logo } from "../assets/crown.svg";

import {
  Button,
  Container,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Flex,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

function Header() {
  return (
    <NavBarContainer>
      <Logo />
      <HStack spacing="1.2rem">
        <CartDropdownMenu />
        <HeaderMenu />
      </HStack>
    </NavBarContainer>
  );
}

function NavBarContainer({ children, ...props }) {
  return (
    <Container maxWidth="container.lg" pb="2rem" pt="2rem" mb="2rem">
      <Flex
        as="nav"
        justify="space-between"
        alignItems="center"
        w="100%"
        {...props}
      >
        {children}
      </Flex>
    </Container>
  );
}

const CartDropdownMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();

  return (
    <>
      <CartDropdownToggle as="button" onClick={onOpen} size="1.7rem" />
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay bg="blackAplha.300" backdropFilter="blur(10px)" />
        <ModalContent w="350px">
          <ModalBody>
            <CartDropdown pt="20px" />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
                navigate("/cart");
              }}
              w="full"
            >
              Go to cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <HeaderMenuToggle
        as="button"
        onClick={onOpen}
        isOpen={isOpen}
        size="1.7rem"
      />
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        size="xs"
        tranisition="all 0.5s"
      >
        <DrawerOverlay tranisition="all 0.5s" />
        <DrawerContent tranisition="all 0.5s">
          <DrawerHeader>Splendor Clothing</DrawerHeader>
          <DrawerBody>
            <HeaderMenuItem to="/" onClick={onClose}>
              Home
            </HeaderMenuItem>
            <HeaderMenuItem to="/shop" onClick={onClose}>
              Shop
            </HeaderMenuItem>
            <HeaderMenuItem to="/contact" onClick={onClose}>
              Contact
            </HeaderMenuItem>
            <HeaderMenuItem
              to="/signin"
              onClick={onClose}
              currentUser={!currentUser}
            >
              Sign in
            </HeaderMenuItem>
            <HeaderMenuItem
              to="/signup"
              onClick={onClose}
              currentUser={!currentUser}
            >
              Sign up
            </HeaderMenuItem>
            <HeaderMenuItem
              to="/"
              onClick={() => {
                dispatch(signOutStart());
                onClose();
              }}
              currentUser={currentUser}
            >
              Sign out
            </HeaderMenuItem>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
