import { Ingredient, Order } from 'types';

export default function VerifyOrder(
  order: Order,
  allIngredients: Ingredient[],
) {
  if (order.ingredients.includes('')) {
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

  return true;
}
