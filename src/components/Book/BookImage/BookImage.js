import React from "react";
import PropTypes from "prop-types";

import { isValidURL } from "../../../shared/utility";
import classes from "./BookImage.module.scss";

const BookImage = props => {
  const styles = [classes.BookImage];
  if (props.loaned) {
    styles.push(classes.loaned);
  }

  // if given a valid url use it or fall back image
  let url = "./images/book-image-error.png";
  if (props.image && isValidURL(props.image)) {
    url = props.image;
  }

  return (
    <img
      className={styles.join(" ")}
      src={url}
      onError={err => {
        err.target.onerror = null;
        err.target.src = "./images/book-image-error.png";
      }}
      alt={props.title ? props.title : "Book"}
    />
  );
};

BookImage.propTypes = {
  image: PropTypes.string,
  loaned: PropTypes.bool,
  title: PropTypes.string.isRequired
};

export default BookImage;
