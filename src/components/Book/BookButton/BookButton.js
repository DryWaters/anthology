import React from "react";

import deleteImg from "../../../assets/images/delete-button.png";
import loanImg from "../../../assets/images/loan-book.png";
import returnImg from "../../../assets/images/return-book.png";
import classes from "./BookButton.module.scss";

const BookButton = props => {
  console.log(typeof props.btnType);
  const altText = "";
  // props.btnType.charAt(0).toUppercase() + props.btnType.slice(1) + " Book";
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
      break;
  }
  return (
    <button
      disabled={props.disabled}
      className={[classes.BookButton, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      <img className={classes.image} src={imageSrc} alt={altText} />
    </button>
  );
};

export default BookButton;
