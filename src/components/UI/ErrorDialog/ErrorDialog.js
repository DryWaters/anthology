import React from "react";
import Button from "../../UI/Button/Button";

import classes from "./ErrorDialog.module.scss";

const errorDialog = props => {
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
        <Button btnType="cancel" clicked={props.cancel}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default errorDialog;
