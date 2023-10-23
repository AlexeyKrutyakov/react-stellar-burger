import { STYLES } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { getIngredients, getOrder } from '../../utils/store-selectors';
import styles from './order-card.module.css';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { openModal } from '../../services/modalSlice';
import { useDispatch } from 'react-redux';
import getIngredientsById from '../../utils/ingredients-by-id';
import isOrderCorrect from '../../utils/check-order';

export default function OrderCard({ order, path, hasStatus, onModalOpen }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const allIngredients = useSelector(getIngredients).loaded;

  const loadingIngredients = getIngredientsById(
    order.ingredients,
    allIngredients,
  );
  console.log(loadingIngredients);

  console.log(isOrderCorrect(loadingIngredients));

  const orderNumber = order.number;
  // const burgerData = useSelector(getBurger);
  const burgerData = useSelector(getIngredients).loaded;
  // const bun = burgerData.bun;
  const bun = burgerData[0];
  // const mains = burgerData.mains;
  const mains = burgerData.slice(2, 7);
  let ingredients = [];
  let visibleIngredients = null;
  let length = 0;
  let last = 0;

  // if (bun) {
  //   ingredients = [bun, ...mains];
  //   visibleIngredients = ingredients.slice(0, 7);
  //   length = visibleIngredients.length;
  //   last = length - 1;
  // }

  ingredients = [bun, ...mains];
  visibleIngredients = ingredients.slice(0, 7);
  length = visibleIngredients.length;
  last = length - 1;

  const handleOpenModal = type => {
    dispatch(openModal(type));
  };

  return (
    <Link
      className={styles.link}
      to={`${path}/${orderNumber}`}
      state={{ background: location }}
    >
      <article
        className={styles.card}
        onClick={() => {
          handleOpenModal({ type: 'order__details', item: order });
        }}
      >
        <div className={styles.card_header}>
          <h2 className={styles.digits}>#{orderNumber}</h2>
          <h3 className={`${styles.date} ${STYLES.text.defaultInactive}`}>
            {/* Сегодня, 16:20 i-GMT+3 */}
            {order.createdAt}
          </h3>
        </div>
        <h1 className={`${styles.name} ${STYLES.text.medium}`}>
          {order.name}
          {hasStatus && (
            <span className={`${STYLES.text.default}`}>Готовится</span>
          )}
        </h1>
        <div className={styles.card_footer}>
          <div className={styles.ingredients_icons}>
            {visibleIngredients.map((ingredient, index) => (
              <IngredientIcon
                key={ingredient._id}
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
            <span className={styles.digits}>560&nbsp;</span>
            <CurrencyIcon />
          </h4>
        </div>
      </article>
    </Link>
  );
}
