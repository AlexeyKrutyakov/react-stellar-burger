import { STYLES } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { getIngredients } from '../../utils/store-selectors';
import styles from './order-card.module.css';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderCard() {
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
  if (bun) {
    ingredients = [bun, ...mains];
    visibleIngredients = ingredients.slice(0, 7);
    length = visibleIngredients.length;
    last = length - 1;
  }
  return (
    <article className={styles.card}>
      <div className={styles.line_container}>
        <h2 className={styles.digits}>#034535</h2>
        <h3 className={`${styles.date} ${STYLES.text.defaultInactive}`}>
          Сегодня, 16:20 i-GMT+3
        </h3>
      </div>
      <h1 className={`${styles.name} ${STYLES.text.medium}`}>
        Death Star Starship Main бургер
      </h1>
      <div className={styles.line_container}>
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
  );
}