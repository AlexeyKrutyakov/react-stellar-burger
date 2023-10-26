import { useDispatch, useSelector } from 'react-redux';
import IngredientIcon from '../../components/ingredient-icon/ingredient-icon';
import styles from './order-page.module.css';
import { getIngredients, getOrder } from '../../utils/store-selectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { STYLES } from '../../utils/constants';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { getOrderFromServer } from '../../services/orderSlice';
import getIngredientsById from '../../utils/ingredients-by-id';
import { nanoid } from '@reduxjs/toolkit';
import translateStatus from '../../utils/translate-status';
import calculateTotalPrice from '../../utils/calculate-total-price';
import convertDateFromToday from '../../utils/convert-date-from-today';

export default function OrderPage() {
  const { orderNumber } = useParams();
  const allIngredients = useSelector(getIngredients).loaded;
  const dispatch = useDispatch();
  const order = useSelector(getOrder);
  const translatedStatus = translateStatus(order.status);
  const formattedDate = convertDateFromToday(order.createdAt);
  let orderIngredients = null;
  let totalPrice = 0;
  if (order.number) {
    const ingredientsFromServer = getIngredientsById(
      order.ingredientsIdList,
      allIngredients,
    );
    const buns = ingredientsFromServer.filter(
      ingredient => ingredient.type === 'bun',
    );
    const mains = ingredientsFromServer.filter(
      ingredient => ingredient.type !== 'bun',
    );
    orderIngredients = [buns[0], ...mains];
    totalPrice = calculateTotalPrice(orderIngredients);
  }

  useEffect(() => {
    dispatch(getOrderFromServer(orderNumber));
  }, []);

  return (
    <section className={styles.section}>
      {order.number && (
        <article className={styles.card}>
          <span className={`${styles.number} ${STYLES.digits.default}`}>
            #{order.number}
          </span>
          <h1 className={`${styles.name} ${STYLES.text.medium}`}>
            {order.name}
          </h1>
          <span
            className={`${
              translatedStatus === 'Выполнен'
                ? styles.status_done
                : translatedStatus === 'Отменен'
                ? styles.status_rejected
                : ''
            } ${styles.status} ${STYLES.text.default}`}
          >
            {translatedStatus}
          </span>
          <h2 className={`${styles.list_title} ${STYLES.text.medium}`}>
            Состав:
          </h2>
          <ul className={`${styles.list} custom-scroll`}>
            {orderIngredients.map(ingredient => (
              <li key={nanoid()} className={styles.ingredient}>
                <IngredientIcon ingredient={ingredient} />
                <h3
                  className={`${styles.ingredient_name} ${STYLES.text.default}`}
                >
                  {ingredient.name}
                </h3>
                <h4 className={styles.ingredient_price}>
                  <span className={`${STYLES.digits.default}`}>
                    {`${
                      ingredient.type === 'bun' ? '2' : '1'
                    } x ${ingredient.price.toLocaleString('ru-RU')}`}
                  </span>
                  <CurrencyIcon />
                </h4>
              </li>
            ))}
          </ul>
          <div className={styles.order_footer}>
            <p className={`${styles.date} ${STYLES.text.defaultInactive}`}>
              {formattedDate}
            </p>
            <h5 className={`${styles.total_price}`}>
              <span className={STYLES.digits.default}>
                {totalPrice.toLocaleString('ru-RU')}
              </span>{' '}
              <CurrencyIcon />
            </h5>
          </div>
        </article>
      )}
    </section>
  );
}
