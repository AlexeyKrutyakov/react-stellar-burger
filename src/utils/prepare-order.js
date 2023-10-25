import convertDateFromToday from './convert-date-from-today';
import getIngredientsById from './ingredients-by-id';
import VerifyOrder from './verify-order';

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
    const formattedStatus =
      order.status === 'done'
        ? 'Выполнен'
        : order.status === 'pending'
        ? 'Готовится'
        : 'Создан';
    const totalPrice =
      formattedIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0,
      ) + bun.price;

    return {
      number: order.number,
      date: formattedDate,
      name: order.name,
      status: formattedStatus,
      ingredients: formattedIngredients,
      totalPrice: totalPrice,
    };
  }
  return false;
}
