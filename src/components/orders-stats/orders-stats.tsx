import styles from './orders-stats.module.css';
// imports from modules
import { useSelector } from 'react-redux';
// import constants
import { STYLES } from '../../utils/constants';
// import utils
import VerifyOrder from '../../utils/verify-order';
import { getFeed } from '../../utils/store-selectors';
import { getIngredients } from '../../utils/store-selectors';
// import types
import { Order, FeedOrder } from 'types';
import { FC } from 'react';

export default function OrdersStats() {
  const feed = useSelector(getFeed);
  const allIngredients = useSelector(getIngredients).loaded;
  const correctOrders = feed.orders.filter(order =>
    VerifyOrder(order, allIngredients),
  );

  const getOrderNumbers = (orders: FeedOrder[], status: string) => {
    const numbers = orders.map(order => {
      if (order && order.status === status) return order.number;
    });
    return numbers.filter(number => number !== undefined);
  };

  const doneOrders = getOrderNumbers(correctOrders, 'done');
  const pengingOrders = getOrderNumbers(correctOrders, 'pending');

  return (
    <section className={styles.section}>
      <article
        className={`${styles.ready_orders} ${styles.list} ${STYLES.text.default}`}
      >
        <h2 className={styles.title}>Готовы:</h2>
        <ul className={styles.orders_numbers}>
          {doneOrders.length > 0 &&
            doneOrders.map(orderNumber => (
              <li key={orderNumber}>
                <span
                  className={`${STYLES.digits.default} ${styles.ready_order_number}`}
                >
                  {orderNumber}
                </span>
              </li>
            ))}
        </ul>
      </article>
      <article
        className={`${styles.inprogress_orders} ${styles.list} ${STYLES.text.default}`}
      >
        <h2 className={styles.title}>В работе:</h2>
        <ul className={styles.orders_numbers}>
          {pengingOrders.length > 0 &&
            pengingOrders.map(orderNumber => (
              <li key={orderNumber}>
                <span className={`${STYLES.digits.default}`}>
                  {orderNumber}
                </span>
              </li>
            ))}
        </ul>
      </article>
      <article className={`${styles.total_orders} ${STYLES.text.default}`}>
        <h2 className={styles.title}>Выполнено за все время:</h2>
        <span className={`${STYLES.digits.large}`}>
          {feed.total.toLocaleString('ru-RU')}
        </span>
      </article>
      <article className={`${styles.today_orders} ${STYLES.text.default}`}>
        <h2 className={styles.title}>Выполнено за сегодня:</h2>
        <span className={`${STYLES.digits.large}`}>
          {feed.totalToday.toLocaleString('ru-RU')}
        </span>
      </article>
    </section>
  );
}
