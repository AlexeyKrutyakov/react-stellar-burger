import styles from './ingredient-icon.module.css';
import { STYLES } from '../../utils/constants';

export default function IngredientIcon({
  ingredient,
  options = {
    style: {
      preview_wrap: {},
    },
    length: 0,
    last: 0,
  },
}) {
  const { style, index, length, last } = options;
  return (
    <div className={styles.preview_wrap} style={style.preview_wrap}>
      <article className={styles.ingredient_preview}>
        <img
          style={index === last ? { opacity: 0.6 } : {}}
          className={styles.icon}
          src={ingredient.image}
          alt={ingredient.name}
        />
        {options && index === last && (
          <span className={`${styles.number} ${STYLES.text.default}`}>
            {length > 5 ? `+${length - 5}` : ''}
          </span>
        )}
      </article>
    </div>
  );
}

// add propTypes
