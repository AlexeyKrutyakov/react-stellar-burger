import React from "react";
import styles from './modal.module.css';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';

import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal({ children,  onCloseModal}) {

  const modal = React.useRef();
  const modalRoot = document.getElementById('modal-root');

  function handleButtonCloseClick() {
    if (modal.current) {
      onCloseModal();
    }
  }

  function handleEscapeDown(e) {
    if (e.key === 'Escape') {
      onCloseModal();
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
      <div className={styles.modal__container} ref={modal}>
        <ModalOverlay onOverlayClick={onCloseModal} />
        <div className={styles.modal}>
          {children}
          <button className={styles.modal__close_button} onClick={handleButtonCloseClick}></button>
        </div>
      </div>
    ), modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired
}

export default Modal;
