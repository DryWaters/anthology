import React from "react";

import classes from "./BookButton.module.scss";

const BookButton = props => (
  <button
    disabled={props.disabled}
    className={[classes.BookButton, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default BookButton;
