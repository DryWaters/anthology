import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";

import classes from "./Header.module.scss";

const Header = props => (
  <header className={classes.Header}>
    <div className={classes.logoText}>ANTHOLOGY</div>
    <Button clicked={props.onClicked} btnType="primary">
      Add Book
    </Button>
  </header>
);

Header.propTypes = {
  onClicked: PropTypes.func.isRequired
};

export default Header;
