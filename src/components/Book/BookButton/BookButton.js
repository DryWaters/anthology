import React from "react";
import PropTypes from "prop-types";

import deleteImg from "../../../assets/images/delete-button.png";
import loanImg from "../../../assets/images/loan-book.png";
import returnImg from "../../../assets/images/return-book.png";
import classes from "./BookButton.module.scss";

const BookButton = props => {
  const altText =
    props.btnType.charAt(0).toUpperCase() + props.btnType.slice(1) + " Book";

  let imageSrc = null;
  switch (props.btnType) {
    case "delete":
      imageSrc = deleteImg;
      break;
    case "loan":
      imageSrc = loanImg;
      break;
    case "return":
      imageSrc = returnImg;
      break;
    default:
      imageSrc = deleteImg;
      break;
  }
  return (
    <button
      className={[classes.BookButton, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      <img src={imageSrc} alt={altText} />
    </button>
  );
};

BookButton.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired
};

export default BookButton;
