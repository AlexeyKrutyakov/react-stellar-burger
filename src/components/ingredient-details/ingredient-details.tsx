import styles from './ingredient-details.module.css';
// imports from modules
import { useParams } from 'react-router';
// import utils
import getIngredient from '../../utils/getIngredient';
import { getIngredients } from '../../utils/store-selectors';
import { STYLES } from '../../utils/constants';
import { Ingredient, useAppSelector } from 'types';

function IngredientDetails() {
  const { ingredientId } = useParams();
  const ingredients: Ingredient[] | null =
    useAppSelector(getIngredients).loaded;
  let ingredient: Ingredient | null = null;
  if (ingredients && ingredientId)
    ingredient = getIngredient(ingredients, ingredientId);

  return (
    <>
      <h1 className={`${styles.title} ${STYLES.text.large} mt-8`}>
        Детали ингредиента
      </h1>
      <img src={ingredient?.image_large} alt={ingredient?.name} />
      <h1 className={`${STYLES.text.medium} mt-4`}>{ingredient?.name}</h1>
      <div className={`${styles.nutritional_values} mt-8 mb-15`}>
        <article className={styles.value}>
          <p className={`${STYLES.text.defaultInactive}`}>Калории,ккал</p>
          <span className={`${STYLES.digits.defaultInactive}`}>
            {ingredient?.calories}
          </span>
        </article>
        <article className={styles.value}>
          <p className={`${STYLES.text.defaultInactive}`}>Белки, г</p>
          <span className={`${STYLES.digits.defaultInactive}`}>
            {ingredient?.proteins}
          </span>
        </article>
        <article className={styles.value}>
          <p className={`${STYLES.text.defaultInactive}`}>Жиры, г</p>
          <span className={`${STYLES.digits.defaultInactive}`}>
            {ingredient?.fat}
          </span>
        </article>
        <article className={styles.value}>
          <p className={`${STYLES.text.defaultInactive}`}>Углеводы, г</p>
          <span className={`${STYLES.digits.defaultInactive}`}>
            {ingredient?.carbohydrates}
          </span>
        </article>
      </div>
    </>
  );
}

export default IngredientDetails;
