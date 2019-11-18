import React from "react";

import BookImage from "../BookImage/BookImage";
import Button from "../../UI/Button/Button";

import classes from "./BookDialog.module.scss";

const BookDialog = props => {
  // Generate error message output if passed in from fetch()
  // Note: error message is cleared when modal is closed
  let errorMessage = null;
  if (props.errorMessage) {
    errorMessage = <p className="error">ERROR: {props.errorMessage}</p>;
  }

  return (
    <div className={classes.BookDialog}>
      <h2>Delete Book</h2>
      {errorMessage}
      <div>
        <BookImage title={props.book.title} image={props.book.image} />
      </div>
      <div>
        <p className={classes.prompt}>Are you sure you want to delete</p>
        <span className={classes.title}>{props.book.title}?</span>
      </div>
      <div>
        <Button btnType="cancel" clicked={props.cancel}>
          Cancel
        </Button>
        <Button
          btnType="danger"
          clicked={() => props.delete(props.book.id, "DELETE")}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BookDialog;
