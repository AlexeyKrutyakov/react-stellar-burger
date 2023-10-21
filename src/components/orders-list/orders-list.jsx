import OrderCard from '../order-card/order-card';
import styles from './orders-list.module.css';

export default function OrdersList({ hasStatus = false }) {
  return (
    <section className={`${styles.section} custom-scroll`}>
      <div className={styles.orders_list}>
        <OrderCard hasStatus={hasStatus} />
        <OrderCard hasStatus={hasStatus} />
        <OrderCard hasStatus={hasStatus} />
        <OrderCard hasStatus={hasStatus} />
      </div>
    </section>
  );
}
