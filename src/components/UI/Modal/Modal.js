import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.scss";

const Modal = props => {
  const modalStyles = props.show ? [classes.show] : [classes.hide];

  return (
    <Fragment>
      <Backdrop show={props.show} onClicked={props.onModalClose} />
      <div className={[modalStyles, classes.Modal].join(" ")}>
        {props.children}
      </div>
    </Fragment>
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default Modal;
