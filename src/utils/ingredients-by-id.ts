import { Ingredient } from 'types';

export default function getIngredientsById(
  idList: string[],
  ingredientsList: Ingredient[],
) {
  const ingredients: Ingredient[] = [];

  idList.forEach(id => {
    const foundIngredient = ingredientsList.find(
      ingredient => ingredient._id === id,
    );
    if (foundIngredient) ingredients.push(foundIngredient);
  });
  return ingredients;
}
