import React from "react";

import classes from "./Button.module.scss";

const Button = props => {
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

export default Button;
