import { useSelector } from 'react-redux';
import styles from './order-feed-page.module.css';
import { getIngredients } from '../../utils/store-selectors';
import { STYLES } from '../../utils/constants';
import IngredientIcon from '../../components/ingredient-icon/ingredient-icon';

export default function OrderFeedPage() {
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

  if (visibleIngredients) {
    return (
      <div className={styles.section}>
        {visibleIngredients.map((ingredient, index) => (
          <div
            key={ingredient._id}
            className={styles.preview_wrap}
            style={{
              zIndex: length - index,
              left: `${-16 * index}px`,
            }}
          >
            <article className={styles.ingredient_preview}>
              <img
                style={index === last ? { opacity: 0.6 } : {}}
                className={styles.icon}
                src={ingredient.image}
                alt={ingredient.name}
              />
              {index === last && (
                <span className={`${styles.number} ${STYLES.text.default}`}>
                  {ingredients.length > 5 ? `+${ingredients.length - 5}` : ''}
                </span>
              )}
            </article>
          </div>
        ))}
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
    );
  }

  return <></>;
}
