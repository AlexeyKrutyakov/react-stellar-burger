import React from "react";
import styles from './modal-overlay.module.css';

export default function ModalOverlay( { onOverlayClick}) {
  return (
    <section className={styles.modal__overlay} onClick={onOverlayClick}></section>
  );
}