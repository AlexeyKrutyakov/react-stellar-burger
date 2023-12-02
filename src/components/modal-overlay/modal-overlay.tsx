import styles from './modal-overlay.module.css';
// imports from modules
import PropTypes from 'prop-types';

export default function ModalOverlay({
  onOverlayClick,
}: {
  onOverlayClick: () => void;
}) {
  return (
    <section
      className={styles.modal__overlay}
      onClick={onOverlayClick}
    ></section>
  );
}

ModalOverlay.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
};
