export default function getIngredient(ingredients, id) {
  for (let i = 0; i < ingredients.length; i++) {
    if (ingredients[i]._id === id) return ingredients[i];
  }
  return null;
}
