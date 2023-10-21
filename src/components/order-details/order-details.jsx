import { useSelector } from 'react-redux';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './order-details.module.css';
import { getOrder } from '../../utils/store-selectors';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { STYLES } from '../../utils/constants';

export default function OrderDetails() {
  const orderIngredients = useSelector(getOrder).ingredientsIdList;

  return (
    <article className={styles.card}>
      <span className={`${styles.number} ${STYLES.digits.default}`}>
        #12345
      </span>
      <h1 className={`${styles.name} ${STYLES.text.medium}`}>
        Black Hole Singularity острый бургер
      </h1>
      <span className={`${styles.status} ${STYLES.text.default}`}>
        Выполнен
      </span>
      <h2 className={`${styles.list_title} ${STYLES.text.medium}`}>Состав:</h2>
      <ul className={`${styles.list} custom-scroll`}>
        <li className={styles.ingredient}>
          <IngredientIcon ingredient={orderIngredients[0]} />
          <h3 className={`${styles.ingredient_name} ${STYLES.text.default}`}>
            Флюоресцентная булка R2-D3
          </h3>
          <h4 className={styles.ingredient_price}>
            <span className={`${STYLES.digits.default}`}>1 x 30</span>
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
  );
}
