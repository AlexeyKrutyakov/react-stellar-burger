import { Ingredient } from './ingredients';

export type Burger = {
  bun: Ingredient | null;
  mains: Ingredient[] | [];
};
