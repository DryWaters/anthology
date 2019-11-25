import React from "react";
import PropTypes from "prop-types";

import Button from "../../UI/Button/Button";

import classes from "./ErrorDialog.module.scss";

const ErrorDialog = props => {
  // Generate error message output if passed in from fetch()
  // Note: error message is cleared when modal is closed
  let errorMessage = null;
  if (props.errorMessage) {
    errorMessage = <p className="error">{props.errorMessage}</p>;
  }

  return (
    <div className={classes.ErrorDialog}>
      {errorMessage}
      <div>
        <Button btnType="cancel" clicked={props.onCancel}>
          OK
        </Button>
      </div>
    </div>
  );
};

ErrorDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default ErrorDialog;
