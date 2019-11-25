import React from "react";
import PropTypes from "prop-types";

import BookButton from "./BookButton/BookButton";
import BookImage from "./BookImage/BookImage";

import classes from "./Book.module.scss";

const Book = props => {
  const status = props.loaned ? "return" : "loan";

  // Guard against really long titles
  let title = props.title;
  if (title.length > 70) {
    title = title.slice(0, 67) + "...";
  }

  return (
    <div className={classes.Book}>
      <div className={classes.bookControls}>
        <BookButton onClicked={props.onDeleteBook} btnType={"delete"} />
        <button className={classes.imageButton} onClick={props.onClickImage}>
          <BookImage
            title={props.title}
            image={props.image}
            loaned={props.loaned}
          />
        </button>
        <BookButton onClicked={props.onToggleLoan} btnType={status} />
      </div>
      <div className={classes.title}>{title}</div>
    </div>
  );
};

Book.propTypes = {
  image: PropTypes.string,
  loaned: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
  onDeleteBook: PropTypes.func,
  onToggleLoan: PropTypes.func.isRequired
};

export default Book;
