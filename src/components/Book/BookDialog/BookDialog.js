import React from "react";

import BookImage from "../BookImage/BookImage";
import Button from "../../UI/Button/Button";

import classes from "./BookDialog.module.scss";

const BookDialog = props => (
  <div className={classes.BookDialog}>
    <div>
      <BookImage title={props.book.title} image={props.book.image} />
    </div>
    <div>
      <p className={classes.prompt}>Are you sure you want to delete</p>{" "}
      <span className={classes.title}>{props.book.title}?</span>
    </div>
    <div>
      <Button btnType="cancel" clicked={props.cancel}>
        Cancel
      </Button>
      <Button btnType="danger" clicked={props.delete}>
        Delete
      </Button>
    </div>
  </div>
);

export default BookDialog;
