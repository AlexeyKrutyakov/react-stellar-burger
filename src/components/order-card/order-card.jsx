import { STYLES } from '../../utils/constants';
import styles from './order-card.module.css';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { openModal } from '../../services/modalSlice';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

export default function OrderCard({ order, hasStatus }) {
  const { number, date, name, status, ingredients, totalPrice } = order;
  const location = useLocation();
  const dispatch = useDispatch();

  let last = 5;

  const visibleIngredients = ingredients.slice(0, 6);
  const length = ingredients.length;

  const handleOpenModal = ({ type, item }) => {
    dispatch(openModal({ type, item }));
  };

  return (
    <Link
      className={styles.link}
      to={`${location.pathname}/${number}`}
      state={{ background: location }}
    >
      <article
        className={styles.card}
        onClick={() => {
          handleOpenModal({
            type: 'order__details',
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
                status === 'Выполнен'
                  ? `${STYLES.text.default} ${styles.status_done}`
                  : `${STYLES.text.default}`
              }
            >
              {status}
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
