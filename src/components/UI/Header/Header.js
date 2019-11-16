import React from "react";

import Logo from "../Logo/Logo";
import Button from "../Button/Button";

import classes from "./Header.module.scss";

const Header = props => (
  <div className={classes.Header}>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <Button>Add</Button>
  </div>
);

export default Header;
