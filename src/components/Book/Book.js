import React from "react";

import BookButton from "./BookButton/BookButton";

import classes from "./Book.module.scss";

const Book = props => (
  <div className={classes.Book}>
    <BookButton>Delete</BookButton>
    <div>Book</div>
    <BookButton>Loan</BookButton>
  </div>
);

export default Book;
