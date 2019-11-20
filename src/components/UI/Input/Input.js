import React from "react";
import PropTypes from "prop-types";

import classes from "./Input.module.scss";

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.inputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(classes.invalid);
  }

  let label = "";
  if (props.label) {
    label = props.label.charAt(0).toUpperCase() + props.label.slice(1);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          checked={props.checked}
          onBlur={props.blurred}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label>{label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  blurred: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  elementType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  value: PropTypes.string
};

export default Input;
