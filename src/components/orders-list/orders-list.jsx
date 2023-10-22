import OrderCard from '../order-card/order-card';
import styles from './orders-list.module.css';

export default function OrdersList({ path = '', hasStatus = false }) {
  return (
    <section className={`${styles.section} custom-scroll`}>
      <ul className={styles.orders_list}>
        <li>
          <OrderCard path={path} hasStatus={hasStatus} />
        </li>
        <li>
          <OrderCard path={path} hasStatus={hasStatus} />
        </li>
        <li>
          <OrderCard path={path} hasStatus={hasStatus} />
        </li>
        <li>
          <OrderCard path={path} hasStatus={hasStatus} />
        </li>
      </ul>
    </section>
  );
}
