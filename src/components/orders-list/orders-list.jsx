import OrderCard from '../order-card/order-card';
import styles from './orders-list.module.css';

export default function OrdersList() {
  return (
    <section className={`${styles.section} custom-scroll`}>
      <div className={styles.orders_list}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </section>
  );
}
