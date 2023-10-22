import { useSelector } from 'react-redux';
import IngredientIcon from '../../components/ingredient-icon/ingredient-icon';
import styles from './order-page.module.css';
import { getOrder } from '../../utils/store-selectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { STYLES } from '../../utils/constants';

export default function OrderPage() {
  const order = useSelector(getOrder);
  const orderIngredients = order.ingredientsIdList;

  return (
    <section className={styles.section}>
      <article className={styles.card}>
        <span className={`${styles.number} ${STYLES.digits.default}`}>
          #{order.number}
        </span>
        <h1 className={`${styles.name} ${STYLES.text.medium}`}>{order.name}</h1>
        <span
          className={`${
            order.status === 'Выполнен'
              ? styles.status_done
              : order.status === 'Отменен'
              ? styles.status_rejected
              : ''
          } ${styles.status} ${STYLES.text.default}`}
        >
          {order.status}
        </span>
        <h2 className={`${styles.list_title} ${STYLES.text.medium}`}>
          Состав:
        </h2>
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
            Вчера, 13:50 i-GMT+3
          </p>
          <h5 className={`${styles.total_price}`}>
            <span className={STYLES.digits.default}>510</span> <CurrencyIcon />
          </h5>
        </div>
      </article>
    </section>
  );
}
