import styles from './orders-list.module.css';
// imports from modules
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
// import components
import OrderCard from '../order-card/order-card';
// import constants
import { PATHS } from '../../utils/constants';
// import utils
import {
  getFeed,
  getIngredients,
  getProfile,
} from '../../utils/store-selectors';
import prepareOrderToRender from '../../utils/prepare-order';
import { Order, PreparedOrder } from 'types';

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
            let preparedOrder: PreparedOrder | false = false;
            if (allIngredients)
              preparedOrder = prepareOrderToRender(order, allIngredients);
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

OrdersList.propTypes = {
  hasStatus: PropTypes.bool,
};
