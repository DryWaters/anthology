import React from "react";

import Button from "../Button/Button";

import classes from "./Header.module.scss";

const Header = props => (
  <div className={classes.Header}>
    <div className={classes.logoText}>ANTHOLOGY</div>
    <Button clicked={props.clicked} btnType="primary">
      Add Book
    </Button>
  </div>
);

export default Header;
