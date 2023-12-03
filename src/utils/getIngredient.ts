import { Ingredient } from 'types';

export default function getIngredient(ingredients: Ingredient[], id: string) {
  for (let i = 0; i < ingredients.length; i++) {
    if (ingredients[i]._id === id) return ingredients[i];
  }
  return null;
}
