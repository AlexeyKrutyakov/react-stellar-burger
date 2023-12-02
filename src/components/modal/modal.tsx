import styles from './modal.module.css';
// imports from modules
import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
// import components
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import utils
import { getModal } from '../../utils/store-selectors';
import { ModalProps } from 'types';

export default function Modal({
  children,
  onCloseModal,
  forSpinner,
}: ModalProps) {
  const modalRoot = document.getElementById('modal-root');

  function closeModal() {
    onCloseModal();
  }

  function handleEscapeDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeDown);

    return () => {
      document.removeEventListener('keydown', handleEscapeDown);
    };
  });

  // return createPortal(
  return (
    <div className={styles.modal__container}>
      <ModalOverlay onOverlayClick={closeModal} />
      <div className={styles.modal}>
        {children}
        {!forSpinner && (
          <button className={styles.modal__close_button} onClick={closeModal}>
            <CloseIcon type="primary" />
          </button>
        )}
      </div>
    </div>
    // modalRoot as HTMLElement,
  );
}
