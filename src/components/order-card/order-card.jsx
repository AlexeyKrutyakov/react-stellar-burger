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
  date,
  name,
  status,
  ingredients,
  path,
  hasStatus,
}) {
  const location = useLocation();
  const dispatch = useDispatch();

  const bun = ingredients.filter(ingredient => ingredient.type === 'bun')[0];
  const mains = ingredients.filter(
    ingredient => ingredient.type === 'main' || ingredient.type === 'sauce',
  );

  const orderIngredients = [bun, ...mains];
  const orderDate = convertDateFromToday(date);
  const orderStatus =
    status === 'done'
      ? 'Выполнен'
      : status === 'pending'
      ? 'Готовится'
      : 'Создан';
  const totalPrice =
    orderIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0) +
    bun.price;

  let length = 0;
  let last = 5;

  const visibleIngredients = orderIngredients.slice(0, 6);
  length = orderIngredients.length;

  const handleOpenModal = type => {
    dispatch(openModal(type));
  };

  return (
    <Link
      className={styles.link}
      to={`${path}/${number}`}
      state={{ background: location }}
    >
      <article
        className={styles.card}
        // onClick={() => {
        //   handleOpenModal({
        //     type: 'order__details',
        //     item: { number, orderDate, name, orderStatus, orderIngredients },
        //   });
        // }}
      >
        <div className={styles.card_header}>
          <h2 className={styles.digits}>#{number}</h2>
          <h3 className={`${styles.date} ${STYLES.text.defaultInactive}`}>
            {orderDate}
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
