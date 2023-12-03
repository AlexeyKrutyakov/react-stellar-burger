import styles from './order-page.module.css';
// imports from modules
import { useEffect } from 'react';
import { useParams } from 'react-router';
// import components
import { IngredientIcon } from '../../components/ingredient-icon/ingredient-icon';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import services
import { getOrderFromServer } from '../../services/orderSlice';
// import constants
import { STYLES } from '../../utils/constants';
// import utils
import translateStatus from '../../utils/translate-status';
import getIngredientsById from '../../utils/ingredients-by-id';
import calculateTotalPrice from '../../utils/calculate-total-price';
import { getIngredients, getOrder } from '../../utils/store-selectors';
// import types
import { AppDispatch, useAppDispatch, useAppSelector } from 'types';

export default function OrderPage() {
  const { orderNumber } = useParams();
  const dispatch: AppDispatch = useAppDispatch();

  const allIngredients = useAppSelector(getIngredients).loaded;
  const order = useAppSelector(getOrder);
  const translatedStatus = translateStatus(order.status);

  let orderIngredients = null;
  let totalPrice = 0;

  if (order.number && allIngredients) {
    const ingredientsFromServer = getIngredientsById(
      order.ingredients,
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
    if (orderNumber) dispatch(getOrderFromServer(orderNumber));
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
            {orderIngredients &&
              orderIngredients.map((ingredient, index) => (
                <li key={index} className={styles.ingredient}>
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
                    <CurrencyIcon type="primary" />
                  </h4>
                </li>
              ))}
          </ul>
          <div className={styles.order_footer}>
            <p className={`${styles.date} ${STYLES.text.defaultInactive}`}>
              <FormattedDate date={new Date(order.createdAt)} />
            </p>
            <h5 className={`${styles.total_price}`}>
              <span className={STYLES.digits.default}>
                {totalPrice.toLocaleString('ru-RU')}
              </span>{' '}
              <CurrencyIcon type="primary" />
            </h5>
          </div>
        </article>
      )}
    </section>
  );
}
