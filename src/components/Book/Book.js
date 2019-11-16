import React from "react";

import BookButton from "./BookButton/BookButton";

import classes from "./Book.module.scss";

const Book = props => (
  <div>
    {console.log(props)}
    <div className={classes.Book}>
      <BookButton clicked={props.deleteBook}>Delete</BookButton>
      <img
        src={props.image}
        onClick={props.clickBook}
        alt={props.title}
        onError={err => {
          err.target.onerror = null;
          err.target.src = "./images/book-image-error.png";
        }}
      />
      <BookButton clicked={props.toggleLoan}>Loan</BookButton>
    </div>
    <div className={classes.title}>{props.title}</div>
  </div>
);

export default Book;
