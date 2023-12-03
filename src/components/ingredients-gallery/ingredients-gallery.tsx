// imports
import styles from './ingredients-gallery.module.css';
// imports from modules
// import components
import { IngredientsCard } from '../ingredients-card/ingredients-card';
// import utils
import { getIngredients } from '../../utils/store-selectors';
// import types
import { Ingredient, useAppSelector } from 'types';

export const IngredientsGallery = ({ type }: { type: string }) => {
  const ingredients = useAppSelector(getIngredients).loaded;
  let filteredIngredients: Ingredient[] | null = null;

  if (ingredients)
    filteredIngredients = ingredients.filter(
      ingredient => ingredient.type === type,
    );

  return (
    <ul className={`${styles.ingredients__gallery} mt-6 mr-3 mb-10 ml-3`}>
      {filteredIngredients &&
        filteredIngredients.map((item, index) => (
          <IngredientsCard key={index} ingredient={item} />
        ))}
    </ul>
  );
};
