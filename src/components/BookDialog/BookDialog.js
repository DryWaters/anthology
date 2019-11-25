import React from "react";
import PropTypes from "prop-types";

import BookImage from "../Book/BookImage/BookImage";
import Button from "../UI/Button/Button";

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
        <Button btnType="cancel" clicked={props.onCancel}>
          Cancel
        </Button>
        <Button
          btnType="danger"
          clicked={() => props.onDelete(props.book.id, "DELETE")}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

BookDialog.propTypes = {
  book: PropTypes.shape({
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    isbn: PropTypes.string,
    loaned: PropTypes.bool,
    title: PropTypes.string.isRequired
  }),
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default BookDialog;
