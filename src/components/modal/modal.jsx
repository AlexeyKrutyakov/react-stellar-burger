import styles from './modal.module.css';
// imports from modules
import React from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
// import components
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function Modal({ children,  onCloseModal, forSpinner }) {

  const modalType = useSelector(state => state.modal.type);
  const modalRoot = document.getElementById('modal-root');

  function closeModal() {
    onCloseModal({ type: modalType });
  }

  function handleEscapeDown(e) {
    if (e.key === 'Escape') {
      closeModal();
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
        <ModalOverlay onOverlayClick={closeModal} />
        <div className={styles.modal}>
          {children}
          {!forSpinner &&
            <button className={styles.modal__close_button} onClick={closeModal}>
              <CloseIcon type='primary' />
            </button>
          }
        </div>
      </div>
    ), modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired
}

export default Modal;
