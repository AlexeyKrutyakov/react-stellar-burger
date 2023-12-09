import { Ingredient } from 'types';

export default function countIngredients(
  ingredientsList: Ingredient[],
  currentId: string,
) {
  return ingredientsList.reduce(
    (acc: number, currentIngredient: Ingredient) => {
      return currentIngredient._id === currentId ? acc + 1 : acc;
    },
    0,
  );
}
