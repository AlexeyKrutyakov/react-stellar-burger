import styles from './ingredient-icon.module.css';
// import utils
import { STYLES } from '../../utils/constants';
// import types
import { IngredientIconType } from 'types';
import { FC } from 'react';

export const IngredientIcon: FC<IngredientIconType> = ({
  ingredient,
  options = {
    style: {
      preview_wrap: {},
    },
    index: 1,
    length: 0,
    last: 0,
  },
}) => {
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
};
