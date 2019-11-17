import React from "react";

import classes from "./BookImage.module.scss";

const bookImage = props => {
  return (
    <img
      className={classes.BookImage}
      src={props.image ? props.image : "./images/book-image-error.png"}
      onError={err => {
        err.target.onerror = null;
        err.target.src = "./images/book-image-error.png";
      }}
      alt={props.title ? props.title : "Book"}
    />
  );
};

export default bookImage;
