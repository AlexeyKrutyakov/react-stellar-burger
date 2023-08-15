import React from "react";
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay( { onOverlayClick}) {
  return (
    <section className={styles.modal__overlay} onClick={onOverlayClick}></section>
  );
}

ModalOverlay.propTypes = {
  onOverlayClick: PropTypes.func.isRequired
}

export default ModalOverlay;
