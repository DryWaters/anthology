import React, { Fragment } from "react";

import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.scss";

const Modal = props => {
  const styles = props.show ? [classes.show] : [classes.hide];
  styles.push(classes.Modal);

  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClose} />
      <div className={styles.join(" ")}>{props.children}</div>
    </Fragment>
  );
};

export default Modal;
