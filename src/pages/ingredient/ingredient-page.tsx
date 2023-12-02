import styles from './ingredient-page.module.css';
// imports from modules
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
// import utils
import { STYLES } from '../../utils/constants';
import getIngredient from '../../utils/getIngredient';
import { getIngredients } from '../../utils/store-selectors';

export default function IngredientPage() {
  const { ingredientId } = useParams();
  const ingredients = useSelector(getIngredients).loaded;

  useEffect(() => {
    document.title = 'Stellar Burgers: Ingredient Details';
  }, []);

  const ingredient = getIngredient(ingredients, ingredientId);

  return (
    <div className={styles.content}>
      <h1 className={`${styles.title} ${STYLES.text.large}`}>
        Детали ингредиента
      </h1>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h1 className={`${STYLES.text.medium} mt-4`}>{ingredient.name}</h1>
      <div className={`${styles.nutritional_values} mt-8 mb-15`}>
        <article className={styles.value}>
          <p className={`${STYLES.text.defaultInactive}`}>Калории,ккал</p>
          <span className={`${STYLES.digits.defaultInactive}`}>
            {ingredient.calories}
          </span>
        </article>
        <article className={styles.value}>
          <p className={`${STYLES.text.defaultInactive}`}>Белки, г</p>
          <span className={`${STYLES.digits.defaultInactive}`}>
            {ingredient.proteins}
          </span>
        </article>
        <article className={styles.value}>
          <p className={`${STYLES.text.defaultInactive}`}>Жиры, г</p>
          <span className={`${STYLES.digits.defaultInactive}`}>
            {ingredient.fat}
          </span>
        </article>
        <article className={styles.value}>
          <p className={`${STYLES.text.defaultInactive}`}>Углеводы, г</p>
          <span className={`${STYLES.digits.defaultInactive}`}>
            {ingredient.carbohydrates}
          </span>
        </article>
      </div>
    </div>
  );
}
