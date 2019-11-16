import React, { Fragment } from "react";

import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.scss";

const Modal = props => {
  const modalStyles = props.show ? [classes.show] : [classes.hide];

  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClose} />
      <div className={[modalStyles, classes.Modal].join(" ")}>
        {props.children}
      </div>
    </Fragment>
  );
};

export default Modal;
