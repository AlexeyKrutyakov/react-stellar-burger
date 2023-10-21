import { STYLES } from '../../utils/constants';
import styles from './orders-stats.module.css';

export default function OrdersStats() {
  return (
    <section className={styles.section}>
      <acticle
        className={`${styles.ready_orders} ${styles.list} ${STYLES.text.default}`}
      >
        <h2 className={styles.title}>Готовы:</h2>
        <div className={styles.orders_numbers}>
          <span
            className={`${STYLES.digits.default} ${styles.ready_order_number}`}
          >
            034533
          </span>
          <span
            className={`${STYLES.digits.default} ${styles.ready_order_number}`}
          >
            034533
          </span>
          <span
            className={`${STYLES.digits.default} ${styles.ready_order_number}`}
          >
            034533
          </span>
          <span
            className={`${STYLES.digits.default} ${styles.ready_order_number}`}
          >
            034533
          </span>
          <span
            className={`${STYLES.digits.default} ${styles.ready_order_number}`}
          >
            034533
          </span>
        </div>
      </acticle>
      <article
        className={`${styles.inprogress_orders} ${styles.list} ${STYLES.text.default}`}
      >
        <h2 className={styles.title}>В работе:</h2>
        <div className={styles.orders_numbers}>
          <span className={`${STYLES.digits.default}`}>034533</span>
          <span className={`${STYLES.digits.default}`}>034533</span>
          <span className={`${STYLES.digits.default}`}>034533</span>
        </div>
      </article>
      <acticle className={`${styles.total_orders} ${STYLES.text.default}`}>
        <h2 className={styles.title}>Выполнено за все время:</h2>
        <span className={`${STYLES.digits.large}`}>28 752</span>
      </acticle>
      <article className={`${styles.today_orders} ${STYLES.text.default}`}>
        <h2 className={styles.title}>Выполнено за сегодня:</h2>
        <span className={`${STYLES.digits.large}`}>138</span>
      </article>
    </section>
  );
}
