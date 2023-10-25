import { STYLES } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { getIngredients, getOrder } from '../../utils/store-selectors';
import styles from './order-card.module.css';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { openModal } from '../../services/modalSlice';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import convertDateFromToday from '../../utils/convert-date-from-today';

export default function OrderCard({
  number,
  orderDate,
  name,
  orderStatus,
  orderIngredients,
  path,
  hasStatus,
}) {
  const location = useLocation();
  const dispatch = useDispatch();

  const bun = orderIngredients.filter(
    ingredient => ingredient.type === 'bun',
  )[0];
  const mains = orderIngredients.filter(
    ingredient => ingredient.type === 'main' || ingredient.type === 'sauce',
  );

  const ingredients = [bun, ...mains];
  const date = convertDateFromToday(orderDate);
  const status =
    orderStatus === 'done'
      ? 'Выполнен'
      : orderStatus === 'pending'
      ? 'Готовится'
      : 'Создан';
  const totalPrice =
    ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0) +
    bun.price;

  let length = 0;
  let last = 5;

  const visibleIngredients = ingredients.slice(0, 6);
  length = ingredients.length;

  const handleOpenModal = ({ type, item }) => {
    dispatch(openModal({ type, item }));
  };

  return (
    <Link
      className={styles.link}
      to={`${path}/${number}`}
      state={{ background: location }}
    >
      <article
        className={styles.card}
        onClick={() => {
          handleOpenModal({
            type: 'order__details',
            item: { number, date, name, status, ingredients, totalPrice },
          });
        }}
      >
        <div className={styles.card_header}>
          <h2 className={styles.digits}>#{number}</h2>
          <h3 className={`${styles.date} ${STYLES.text.defaultInactive}`}>
            {date}
          </h3>
        </div>
        <h1 className={`${styles.name} ${STYLES.text.medium}`}>
          {name}
          {hasStatus && (
            <span
              className={
                status === 'done'
                  ? `${STYLES.text.default} ${styles.status_done}`
                  : `${STYLES.text.default}`
              }
            >
              {orderStatus}
            </span>
          )}
        </h1>
        <div className={styles.card_footer}>
          <div className={styles.ingredients_icons}>
            {visibleIngredients.map((ingredient, index) => (
              <IngredientIcon
                key={nanoid()}
                ingredient={ingredient}
                options={{
                  style: {
                    preview_wrap: {
                      zIndex: length - index,
                      left: `${-16 * index}px`,
                    },
                  },
                  index,
                  length,
                  last,
                }}
              />
            ))}
          </div>
          <h4 className={styles.line_container}>
            <span className={styles.digits}>{totalPrice}&nbsp;</span>
            <CurrencyIcon />
          </h4>
        </div>
      </article>
    </Link>
  );
}
