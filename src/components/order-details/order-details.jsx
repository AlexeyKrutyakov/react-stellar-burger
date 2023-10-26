import { useSelector } from 'react-redux';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './order-details.module.css';
import {
  getFeed,
  getIngredients,
  getProfile,
} from '../../utils/store-selectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { PATHS, STYLES } from '../../utils/constants';
import { nanoid } from '@reduxjs/toolkit';
import { useLocation, useParams } from 'react-router';
import findOrderByNumber from '../../utils/find-order-by-number';
import prepareOrderToRender from '../../utils/prepare-order';

export default function OrderDetails() {
  const allIngredients = useSelector(getIngredients).loaded;
  const feed = useSelector(getFeed);
  const profile = useSelector(getProfile);
  const { orderNumber } = useParams();
  const location = useLocation();
  let order = null;
  if (location.pathname.includes(PATHS.feed)) {
    order = findOrderByNumber(orderNumber, feed.orders);
  }
  if (location.pathname.includes(PATHS.profile.orders) && profile.orders) {
    order = findOrderByNumber(orderNumber, profile.orders);
  }
  const preparedOrder = prepareOrderToRender(order, allIngredients);

  return (
    preparedOrder && (
      <article className={styles.card}>
        <span className={`${styles.number} ${STYLES.digits.default}`}>
          #{preparedOrder.number}
        </span>
        <h1 className={`${styles.name} ${STYLES.text.medium}`}>
          {preparedOrder.name}
        </h1>
        <span
          className={`${
            preparedOrder.status === 'Выполнен' ? styles.status : ''
          } ${STYLES.text.default}`}
        >
          {preparedOrder.status}
        </span>
        <h2 className={`${styles.list_title} ${STYLES.text.medium}`}>
          Состав:
        </h2>
        <ul className={`${styles.list} custom-scroll`}>
          {preparedOrder.ingredients.map(ingredient => (
            <li key={nanoid()} className={styles.ingredient}>
              <IngredientIcon ingredient={ingredient} />
              <h3
                className={`${styles.ingredient_name} ${STYLES.text.default}`}
              >
                {ingredient.name}
              </h3>
              <h4 className={styles.ingredient_price}>
                <span className={`${STYLES.digits.default}`}>
                  {ingredient.type === 'bun' ? '2' : '1'} x {ingredient.price}
                </span>
                <CurrencyIcon />
              </h4>
            </li>
          ))}
        </ul>
        <div className={styles.order_footer}>
          <p className={`${styles.date} ${STYLES.text.defaultInactive}`}>
            {preparedOrder.date}
          </p>
          <h5 className={`${styles.total_price}`}>
            <span className={STYLES.digits.default}>
              {preparedOrder.totalPrice}
            </span>{' '}
            <CurrencyIcon />
          </h5>
        </div>
      </article>
    )
  );
}
