import React from "react";

import Button from "../../UI/Button/Button";

import classes from "./BookDialog.module.scss";

const BookDialog = props => (
  <div className={classes.BookDialog}>
    <div>
      <img
        className={classes.image}
        src={props.book.image}
        alt={props.book.title}
        onError={err => {
          err.target.onerror = null;
          err.target.src = "./images/book-image-error.png";
        }}
      />
    </div>
    <div>
      <p className={classes.prompt}>Are you sure you want to delete</p>{" "}
      <span className={classes.title}>{props.book.title}?</span>
    </div>
    <div>
      <Button btnType="danger" clicked={props.delete}>
        Delete
      </Button>
      <Button btnType="success" clicked={props.cancel}>
        Cancel
      </Button>
    </div>
  </div>
);

export default BookDialog;
