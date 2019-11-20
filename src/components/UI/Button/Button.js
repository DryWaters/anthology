import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.scss";

const Button = props => {
  // use default type button, unless using form submission button
  let type = "button";
  if (props.btnType === "submit") {
    type = "submit";
  }
  return (
    <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
      type={type}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  btnType: PropTypes.string,
  clicked: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
