export default function isOrderCorrect(ingredients) {
  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  if (buns.length !== 2) return false;

  if (buns[0]._id !== buns[1]._id) return false;

  if (ingredients.includes('' || null) || ingredients.includes(undefined))
    return false;
  return true;
}
