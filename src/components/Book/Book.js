import React from "react";

import BookButton from "./BookButton/BookButton";

import classes from "./Book.module.scss";

const Book = props => (
  <div>
    {console.log(props)}
    <div className={classes.Book}>
      <BookButton>Delete</BookButton>
      <div onClick={props.clickBook}>Book</div>
      <BookButton>Loan</BookButton>
    </div>
    <div className={classes.title}>Title</div>
  </div>
);

export default Book;
