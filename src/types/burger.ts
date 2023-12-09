import { Ingredient } from './ingredients';

export type Burger = {
  bun: Ingredient | null;
  mains: Ingredient[] | [];
};

export type BurgerIngredient = {
  data: Ingredient;
  index: number;
};
