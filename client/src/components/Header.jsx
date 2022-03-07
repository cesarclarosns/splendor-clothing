import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../features/user/userSelectors";
import { signOutStart } from "../features/user/userSlice";

import CartDropdownToggle from "./CartDropdownToggle";
import CartDropdown from "./CartDropdown";
import HeaderMenuToggle from "./HeaderMenuToggle";

import { ReactComponent as Logo } from "../assets/crown.svg";

import {
  Button,
  Container,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Flex,
  HStack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
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
    <Container maxWidth="container.lg" pb="1rem" pt="2rem" mb="1rem">
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
            <CartDropdown pt="20px" onClose={onClose} />
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
  let navigate = useNavigate();

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
        <DrawerContent tranisition="all 0.5s" h="100%" w="100%">
          <DrawerBody w="full">
            <Flex w="100%" h="100%">
              <VStack w="full" m="auto">
                <Logo />
                <Heading w="full" textAlign="center">
                  Splendor Clothing
                </Heading>
                <Button
                  w="full"
                  onClick={() => {
                    navigate("/");
                    onClose();
                  }}
                >
                  Home
                </Button>
                <Button
                  w="full"
                  onClick={() => {
                    navigate("/shop");
                    onClose();
                  }}
                >
                  Shop
                </Button>
                <Button
                  w="full"
                  onClick={() => {
                    navigate("/cart");
                    onClose();
                  }}
                >
                  Cart
                </Button>
                {!currentUser && (
                  <>
                    <Button
                      w="full"
                      onClick={() => {
                        navigate("/signin");
                        onClose();
                      }}
                      currentUser={!currentUser}
                    >
                      Sign in
                    </Button>
                    <Button
                      w="full"
                      onClick={() => {
                        navigate("/signup");
                        onClose();
                      }}
                      currentUser={!currentUser}
                    >
                      Sign up
                    </Button>
                  </>
                )}

                {currentUser && (
                  <Button
                    w="full"
                    onClick={() => {
                      dispatch(signOutStart());
                      navigate("/");
                      onClose();
                    }}
                  >
                    Sign out
                  </Button>
                )}
              </VStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
