import React from "react";
import PropTypes from "prop-types";

import classes from "./Backdrop.module.scss";

const Backdrop = props =>
  props.show && <div className={classes.Backdrop} onClick={props.onClicked} />;

Backdrop.propTypes = {
  onClicked: PropTypes.func.isRequired
};

export default Backdrop;
