import { useSelector } from 'react-redux';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './order-details.module.css';
import { getModal, getOrder } from '../../utils/store-selectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { STYLES } from '../../utils/constants';
import { nanoid } from '@reduxjs/toolkit';

export default function OrderDetails() {
  const order = useSelector(getModal).item;

  return (
    order && (
      <article className={styles.card}>
        <span className={`${styles.number} ${STYLES.digits.default}`}>
          #{order.number}
        </span>
        <h1 className={`${styles.name} ${STYLES.text.medium}`}>{order.name}</h1>
        <span
          className={`${order.status === 'Выполнен' ? styles.status : ''} ${
            STYLES.text.default
          }`}
        >
          {order.status}
        </span>
        <h2 className={`${styles.list_title} ${STYLES.text.medium}`}>
          Состав:
        </h2>
        <ul className={`${styles.list} custom-scroll`}>
          {order.ingredients.map(ingredient => (
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
            {order.date}
          </p>
          <h5 className={`${styles.total_price}`}>
            <span className={STYLES.digits.default}>{order.totalPrice}</span>{' '}
            <CurrencyIcon />
          </h5>
        </div>
      </article>
    )
  );
}
