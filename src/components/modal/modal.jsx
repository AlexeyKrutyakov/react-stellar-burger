import React from "react";
import styles from './modal.module.css';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import ModalOverlay from "../modal-overlay/modal-overlay";
import { useSelector } from "react-redux";

function Modal({ children,  onCloseModal}) {

  const modalType = useSelector(state => state.modal.type);
  const modalRoot = document.getElementById('modal-root');

  function handleCloseClick() {
    onCloseModal({ type: modalType });
  }

  function handleEscapeDown(e) {
    if (e.key === 'Escape') {
      onCloseModal({ type: modalType });
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeDown);

    return () => {
      document.removeEventListener('keydown', handleEscapeDown);
    }
  })

  return createPortal (
    (
      <div className={styles.modal__container}>
        <ModalOverlay onOverlayClick={handleCloseClick} />
        <div className={styles.modal}>
          {children}
          <button className={styles.modal__close_button} onClick={handleCloseClick}></button>
        </div>
      </div>
    ), modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired
}

export default Modal;
