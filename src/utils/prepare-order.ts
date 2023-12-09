import { ORDER } from './constants';
import getIngredientsById from './ingredients-by-id';
import VerifyOrder from './verify-order';
import translateStatus from './translate-status';
import calculateTotalPrice from './calculate-total-price';
import { Order, PreparedOrder, Ingredient } from 'types';

export default function prepareOrderToRender(
  order: Order,
  allIngredietns: Ingredient[],
): PreparedOrder | false {
  if (!order) return false;

  if (VerifyOrder(order, allIngredietns)) {
    const orderIngredients = getIngredientsById(
      order.ingredients,
      allIngredietns,
    );
    const bun = orderIngredients.filter(
      ingredient => ingredient.type === 'bun',
    )[0];
    const mains = orderIngredients.filter(
      ingredient => ingredient.type === 'main' || ingredient.type === 'sauce',
    );
    const formattedIngredients = [bun, ...mains];
    const formattedDate = order.createdAt;
    const translatedStatus = translateStatus(order.status);
    const totalPrice = calculateTotalPrice(formattedIngredients);

    return {
      _id: order._id,
      ingredients: formattedIngredients,
      owner: order.owner,
      status: translatedStatus,
      name: order.name,
      createdAt: formattedDate,
      updatedAt: order.updatedAt,
      number: order.number,
      totalPrice: totalPrice,
      __v: order.__v,
    };
  }
  return false;
}
