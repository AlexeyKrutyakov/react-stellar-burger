import React from "react";
import styles from './modal.module.css';

import ModalOverlay from "../modal-overlay/modal-overlay";

export default function Modal({ children,  onCloseModal}) {

  const modal = React.useRef();
  console.log('modal.current', modal.current);

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

  return (
    <div className={styles.modal__container} ref={modal}>
      <ModalOverlay onOverlayClick={onCloseModal} />
      <div className={styles.modal}>
        {children}
        <button className={styles.modal__close_button} onClick={handleButtonCloseClick}></button>
      </div>
    </div>
  );
}
