import { ORDER } from './constants';
import convertDateFromToday from './convert-date-from-today';
import getIngredientsById from './ingredients-by-id';
import VerifyOrder from './verify-order';
import translateStatus from './translate-status';
import calculateTotalPrice from './calculate-total-price';

export default function prepareOrderToRender(order, allIngredietns) {
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
    const formattedDate = convertDateFromToday(order.createdAt);
    const translatedStatus = translateStatus(order.status);
    const totalPrice = calculateTotalPrice(formattedIngredients);

    return {
      number: order.number,
      date: formattedDate,
      name: order.name,
      status: translatedStatus,
      ingredients: formattedIngredients,
      totalPrice: totalPrice,
    };
  }
  return false;
}
