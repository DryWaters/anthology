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
      />
    </div>
    <div>
      <p className={classes.prompt}>Are you sure you want to delete</p>{" "}
      <span className={classes.title}>{props.book.title}?</span>
    </div>
    <div>
      <Button btnType="danger">Delete</Button>
      <Button btnType="success">Cancel</Button>
    </div>
  </div>
);

export default BookDialog;
