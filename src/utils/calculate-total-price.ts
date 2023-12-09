import { Ingredient } from 'types';

export default function calculateTotalPrice(ingredients: Ingredient[]) {
  const buns = ingredients.filter(item => item.type === 'bun');
  const mains = ingredients.filter(item => item.type !== 'bun');

  return (
    [buns[0], ...mains].reduce((sum, item) => sum + item.price, 0) +
    buns[0].price
  );
}
