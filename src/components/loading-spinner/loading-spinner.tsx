import styles from './loading-spinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingio_spinner}>
      <div className={styles.ldio}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
