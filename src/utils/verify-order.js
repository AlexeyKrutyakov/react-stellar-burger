export default function VerifyOrder(order, allIngredients) {
  if (
    order.ingredients.includes('' || null) ||
    order.ingredients.includes(undefined)
  ) {
    return false;
  }

  const allBuns = allIngredients.filter(
    ingredient => ingredient.type === 'bun',
  );
  const bunsIdList = allBuns.map(bun => bun._id);

  const orderBunsIdList = order.ingredients.filter(ingredientId =>
    bunsIdList.includes(ingredientId),
  );

  if (orderBunsIdList.length > 2 || orderBunsIdList.length < 1) {
    return false;
  }

  if ([...new Set(orderBunsIdList)].length !== 1) {
    return false;
  }

  return true;
}
