import { useSelector } from 'react-redux';
import OrderCard from '../order-card/order-card';
import styles from './orders-list.module.css';
import {
  getFeed,
  getIngredients,
  getProfile,
} from '../../utils/store-selectors';
import prepareOrderToRender from '../../utils/prepare-order';
import { useLocation } from 'react-router';
import { PATHS } from '../../utils/constants';

export default function OrdersList({ hasStatus = false }) {
  let orders = null;
  const feed = useSelector(getFeed);
  const profile = useSelector(getProfile);
  const location = useLocation();
  if (location.pathname.includes(PATHS.feed)) {
    orders = feed.orders;
  }
  if (location.pathname.includes(PATHS.profile.orders) && profile.orders) {
    orders = [...profile.orders].reverse();
  }
  const allIngredients = useSelector(getIngredients).loaded;

  return (
    <section className={`${styles.section} custom-scroll`}>
      <ul className={styles.orders_list}>
        {orders &&
          orders.map(order => {
            const preparedOrder = prepareOrderToRender(order, allIngredients);
            if (preparedOrder) {
              return (
                <li key={order._id}>
                  <OrderCard order={preparedOrder} hasStatus={hasStatus} />
                </li>
              );
            }
          })}
      </ul>
    </section>
  );
}
