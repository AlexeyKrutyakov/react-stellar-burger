import styles from './order-details.module.css';
// imports from modules
import { useLocation, useParams } from 'react-router';
// import components
import { IngredientIcon } from '../ingredient-icon/ingredient-icon';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import constants
import { PATHS, STYLES } from '../../utils/constants';
// import utils
import {
  getFeed,
  getIngredients,
  getProfile,
} from '../../utils/store-selectors';
import prepareOrderToRender from '../../utils/prepare-order';
import findOrderByNumber from '../../utils/find-order-by-number';
// import types
import { PreparedOrder, useAppSelector } from 'types';

export default function OrderDetails() {
  const allIngredients = useAppSelector(getIngredients).loaded;
  const feed = useAppSelector(getFeed);
  const profile = useAppSelector(getProfile);
  const { orderNumber } = useParams();
  const location = useLocation();
  let order = null;
  if (orderNumber && location.pathname.includes(PATHS.feed)) {
    order = findOrderByNumber(orderNumber, feed.orders);
  }
  if (
    orderNumber &&
    location.pathname.includes(PATHS.profile.orders) &&
    profile.orders
  ) {
    order = findOrderByNumber(orderNumber, profile.orders);
  }
  let preparedOrder: PreparedOrder | false = false;

  if (order && allIngredients)
    preparedOrder = prepareOrderToRender(order, allIngredients);

  return !preparedOrder ? (
    <></>
  ) : (
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
      <h2 className={`${styles.list_title} ${STYLES.text.medium}`}>Состав:</h2>
      <ul className={`${styles.list} custom-scroll`}>
        {preparedOrder.ingredients.map((ingredient, index) => (
          <li key={index} className={styles.ingredient}>
            <IngredientIcon ingredient={ingredient} />
            <h3 className={`${styles.ingredient_name} ${STYLES.text.default}`}>
              {ingredient.name}
            </h3>
            <h4 className={styles.ingredient_price}>
              <span className={`${STYLES.digits.default}`}>
                {ingredient.type === 'bun' ? '2' : '1'} x{' '}
                {ingredient.price.toLocaleString('ru-RU')}
              </span>
              <CurrencyIcon type="primary" />
            </h4>
          </li>
        ))}
      </ul>
      <div className={styles.order_footer}>
        <p className={`${styles.date} ${STYLES.text.defaultInactive}`}>
          <FormattedDate date={new Date(preparedOrder.createdAt)} />
        </p>
        <h5 className={`${styles.total_price}`}>
          <span className={STYLES.digits.default}>
            {preparedOrder.totalPrice &&
              preparedOrder.totalPrice.toLocaleString('ru-RU')}
          </span>{' '}
          <CurrencyIcon type="primary" />
        </h5>
      </div>
    </article>
  );
}
