import React from "react";

import Logo from "../Logo/Logo";
import Button from "../Button/Button";

import classes from "./Header.module.scss";

const Header = props => (
  <div className={classes.Header}>
    <div className={classes.logo}>
      <Logo color="white" />
    </div>
    <div className={classes.logoText}>NTHOLOGY</div>
    <Button clicked={props.clicked} btnType="primary">
      Add Book
    </Button>
  </div>
);

export default Header;
