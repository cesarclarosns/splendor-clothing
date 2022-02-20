import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { signOutStart } from "../../features/user/userSlice";

const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const hidden = useSelector((state) => state.cart.hidden);

  const dispatch = useDispatch();

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <Link
            className="option"
            to="/"
            onClick={() => dispatch(signOutStart())}
          >
            SIGN OUT
          </Link>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        {!currentUser ? (
          <Link className="option" to="/signup">
            SIGN UP
          </Link>
        ) : null}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
