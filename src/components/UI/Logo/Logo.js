import React from "react";

import logoWhite from "../../../assets/images/anthology-logo-white.png";
import logoBrown from "../../../assets/images/anthology-logo-brown.png";
import classes from "./Logo.module.scss";

const Logo = props => (
  <div className={classes.Logo}>
    <img
      src={props.color === "brown" ? logoBrown : logoWhite}
      alt="Anthology"
    />
  </div>
);

export default Logo;
