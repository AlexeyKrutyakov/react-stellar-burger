import { useSelector } from 'react-redux';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './order-details.module.css';
import { getOrder } from '../../utils/store-selectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { STYLES } from '../../utils/constants';

export default function OrderDetails({
  number,
  orderDate,
  name,
  orderStatus,
  orderIngredients,
}) {
  return (
    <article className={styles.card}>
      <span className={`${styles.number} ${STYLES.digits.default}`}>
        #{number}
      </span>
      <h1 className={`${styles.name} ${STYLES.text.medium}`}>{name}</h1>
      <span
        className={`${orderStatus === 'Выполнен' ? styles.status : ''} ${
          STYLES.text.default
        }`}
      >
        {orderStatus}
      </span>
      <h2 className={`${styles.list_title} ${STYLES.text.medium}`}>Состав:</h2>
      <ul className={`${styles.list} custom-scroll`}>
        <li className={styles.ingredient}>
          <IngredientIcon ingredient={orderIngredients[0]} />
          <h3 className={`${styles.ingredient_name} ${STYLES.text.default}`}>
            {orderIngredients[0].name}
          </h3>
          <h4 className={styles.ingredient_price}>
            <span className={`${STYLES.digits.default}`}>
              1 x {orderIngredients[0].price}
            </span>
            <CurrencyIcon />
          </h4>
        </li>
      </ul>
      <div className={styles.order_footer}>
        <p className={`${styles.date} ${STYLES.text.defaultInactive}`}>
          {orderDate}
        </p>
        <h5 className={`${styles.total_price}`}>
          <span className={STYLES.digits.default}>510</span> <CurrencyIcon />
        </h5>
      </div>
    </article>
  );
}
