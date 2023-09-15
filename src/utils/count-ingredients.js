export default function countIngredients(ingredientsList, currentId) {
  
  return ingredientsList.reduce((acc, currentIngredient) => {
    return currentIngredient._id === currentId ? acc + 1 : acc
  }, 0);
}
