export default function getIngredientsById(idList, ingredientsList) {
  const ingredients = [];
  idList.forEach(id => {
    const foundIngredient = ingredientsList.find(
      ingredient => ingredient._id === id,
    );
    ingredients.push(foundIngredient);
  });
  return ingredients;
}
