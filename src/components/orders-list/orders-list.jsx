import { useSelector } from 'react-redux';
import OrderCard from '../order-card/order-card';
import styles from './orders-list.module.css';
import { getFeed, getIngredients } from '../../utils/store-selectors';
import getIngredientsById from '../../utils/ingredients-by-id';
import isOrderCorrect from '../../utils/check-order';

export default function OrdersList({ path = '', hasStatus = false }) {
  const feed = useSelector(getFeed);
  const orders = feed.orders;
  const allIngredients = useSelector(getIngredients).loaded;

  return (
    <section className={`${styles.section} custom-scroll`}>
      <ul className={styles.orders_list}>
        {orders &&
          orders.map(order => {
            if (!order) return;
            const orderIngredients = getIngredientsById(
              order.ingredients,
              allIngredients,
            );

            if (isOrderCorrect(orderIngredients)) {
              return (
                <li key={order._id}>
                  <OrderCard
                    number={order.number}
                    date={order.createdAt}
                    name={order.name}
                    status={order.status}
                    ingredients={orderIngredients}
                    path={path}
                    hasStatus={hasStatus}
                  />
                </li>
              );
            }
          })}
      </ul>
    </section>
  );
}
