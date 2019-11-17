import React from "react";

import BookButton from "./BookButton/BookButton";
import BookImage from "./BookImage/BookImage";

import classes from "./Book.module.scss";

const Book = props => {
  const status = props.loaned ? "return" : "loan";
  let title = props.title;
  if (title.length > 70) {
    title = title.slice(0, 67) + "...";
  }

  return (
    <div className={classes.Book}>
      <div className={classes.bookControls}>
        <BookButton clicked={props.deleteBook} btnType={"delete"} />
        <BookImage {...props} />
        <BookButton clicked={props.toggleLoan} btnType={status} />
      </div>
      <div className={classes.title}>{title}</div>
    </div>
  );
};

export default Book;
