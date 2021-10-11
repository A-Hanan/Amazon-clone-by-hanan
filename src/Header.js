import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

function Header() {
  const [{ basket, user, amazonItems }, dispatch] = useStateValue();
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);

  let history = useHistory();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  var searchedText = "";
  function onSearchChange(e) {
    e.preventDefault();
    searchedText = e.target.value;
  }
  function toggle__searchInput(e) {
    e.preventDefault();
    if (isSearchIconClicked) {
      setIsSearchIconClicked(false);
    } else {
      setIsSearchIconClicked(true);
    }

    console.log("searchedText>>>>>", searchedText);
    console.log("editedAmazonItems>>>>", editedAmazonItems);
    if (searchedText == "" || searchedText == null) {
      dispatch({
        type: "RESET_AMAZON_ITEMS",
        amazonItems: amazonItems,
      });
    } else {
      var editedAmazonItems = amazonItems.filter((item) =>
        item.title.toLowerCase().includes(searchedText.toLowerCase())
      );
      dispatch({
        type: "EDIT_AMAZON_ITEMS",
        amazonItems: editedAmazonItems,
      });
    }

    history.push("/home");
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      <div className="header__search">
        <input
          className="header__searchInput"
          id={isSearchIconClicked ? "show__search" : "hide__search"}
          type="text"
          placeholder="Search Products by their title..."
          onChange={onSearchChange}
        />
        <SearchIcon
          onClick={toggle__searchInput}
          className="header__searchIcon"
        />
      </div>
      <div
        className="header__nav"
        id={isSearchIconClicked ? "show__nav" : "hide__nav"}
      >
        <Link to={!user && "/login"}>
          {/**if there is no user then only it open login page */}
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              {user ? `Hello ${user.email}` : "Hello Guest"}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out " : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__option">
            <span className="header__optionLineOne ">
              {basket?.length}
              {/**here question mark is called optional chaining,in any case if basket becom undefined or show error ,it will not freakout */}
            </span>
            <span className="header__optionLineTwo">
              <ShoppingBasketIcon />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
