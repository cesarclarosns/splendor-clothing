import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartDropdownIcon from "../cart-dropdown-icon/cart-dropdown-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import HeaderMenuToggle from "../header-menu-toggle/header-menu-toggle.component";
import HeaderMenuItem from "../header-menu-item/header-menu-item.component";

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
  Stack,
} from "@chakra-ui/react";

const Header = ({ children, ...props }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggle = () => setIsMenuOpen(!isMenuOpen);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxW="container.xl" mt="30px" mb="50px">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        mb={8}
        p={8}
        bg={["primary.500", null, "transparent"]}
        // color={["white", null, "primary.700", null]}
        {...props}
      >
        <HStack>
          <Box color="tomato">
            <Link className="logo-container" to="/">
              <Logo className="logo" />
            </Link>
          </Box>
        </HStack>

        <Box
          d={{ base: isMenuOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Stack
            spacing={8}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
          >
            <HeaderMenuItem to="/shop">Shop</HeaderMenuItem>
            <HeaderMenuItem to="/">Contact</HeaderMenuItem>
            <HeaderMenuItem
              to="/"
              onClick={() => dispatch(signOutStart())}
              currentUser={currentUser}
            >
              Sign Out
            </HeaderMenuItem>
            <HeaderMenuItem to="/signin" currentUser={!currentUser}>
              Sign In
            </HeaderMenuItem>
            <HeaderMenuItem to="/signup" currentUser={!currentUser}>
              Sign Up
            </HeaderMenuItem>

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
                    Go to Bag
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
        </Box>
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <CartDropdownIcon as="button" onClick={onOpen} />
          <HeaderMenuToggle toggle={toggle} isOpen={isMenuOpen} />
        </Stack>
      </Flex>
    </Container>
  );
};

export default Header;

// const rec = (
//   <HStack spacing={8}>
//     <Box>
//       <Link className="option" to="/shop">
//         Shop
//       </Link>
//     </Box>
//     <Box>
//       <Link className="option" to="/shop">
//         Contact
//       </Link>
//     </Box>
//     {currentUser ? (
//       <Box>
//         <Link
//           className="option"
//           to="/"
//           onClick={() => dispatch(signOutStart())}
//         >
//           Sign Out
//         </Link>
//       </Box>
//     ) : (
//       <Box>
//         <Link className="option" to="/signin">
//           Sign In
//         </Link>
//       </Box>
//     )}
//     {!currentUser ? (
//       <Box>
//         <Link className="option" to="/signup">
//           Sign Up
//         </Link>
//       </Box>
//     ) : null}

//     <CartDropdownIcon as="button" onClick={onOpen} />
//     <HeaderMenuToggle toggle={toggle} isOpen={isMenuOpen} />

//     <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose} isCentered>
//       <ModalOverlay bg="blackAplha.300" backdropFilter="blur(10px)" />
//       <ModalContent w="350px">
//         <ModalBody>
//           <CartDropdown pt="20px" />
//         </ModalBody>
//         <ModalFooter>
//           <Button
//             onClick={() => {
//               onClose();
//               navigate("/cart");
//             }}
//             w="full"
//           >
//             Go to Bag
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   </HStack>
// );
