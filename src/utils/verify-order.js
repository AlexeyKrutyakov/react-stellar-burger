import { useSelector } from 'react-redux';
import { getIngredients } from './store-selectors';

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

  const orderBunsIdList = order.ingredients.filter(ingredient =>
    bunsIdList.includes(ingredient),
  );

  if (orderBunsIdList.length !== 2) {
    return false;
  }

  if ([...new Set(orderBunsIdList)].length !== 1) {
    return false;
  }

  return true;
}
