import React from "react";
import styles from './modal.module.css';

import ModalOverlay from "../modal-overlay/modal-overlay";

export default function Modal({ children }) {
  return (
    <div className={styles.modal__container}>
      <ModalOverlay />
      <div className={styles.modal}>
        {children}
        <button className={styles.modal__close_button}></button>
      </div>
    </div>
  );
}
