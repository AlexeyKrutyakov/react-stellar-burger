import { useSelector } from 'react-redux';
import OrderCard from '../order-card/order-card';
import styles from './orders-list.module.css';
import { getFeed } from '../../utils/store-selectors';

export default function OrdersList({ path = '', hasStatus = false }) {
  const feed = useSelector(getFeed);
  const orders = feed.orders;

  return (
    <section className={`${styles.section} custom-scroll`}>
      <ul className={styles.orders_list}>
        {orders &&
          orders.map(
            order =>
              order && (
                <li key={order._id}>
                  <OrderCard order={order} path={path} hasStatus={hasStatus} />
                </li>
              ),
          )}
      </ul>
    </section>
  );
}
