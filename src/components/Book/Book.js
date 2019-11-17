import React from "react";

import BookButton from "./BookButton/BookButton";

import classes from "./Book.module.scss";

const Book = props => {
  const status = props.loaned ? "return" : "loan";

  return (
    <div>
      <div className={classes.Book}>
        <BookButton clicked={props.deleteBook} btnType={"delete"} />
        <img
          className={[classes.image, classes[status]].join(" ")}
          src={props.image}
          onClick={props.clickBook}
          alt={props.title}
          onError={err => {
            err.target.onerror = null;
            err.target.src = "./images/book-image-error.png";
          }}
        />
        <BookButton clicked={props.toggleLoan} btnType={status} />
      </div>
      <div className={classes.title}>{props.title}</div>
    </div>
  );
};

export default Book;
