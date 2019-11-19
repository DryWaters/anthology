import React from "react";

import classes from "./Backdrop.module.scss";

const Backdrop = props =>
  props.show && <div className={classes.Backdrop} onClick={props.clicked} />;

export default Backdrop;
