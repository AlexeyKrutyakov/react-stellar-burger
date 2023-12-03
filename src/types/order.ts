import { Ingredient } from './ingredients';

export type Order = {
  _id: string; //todo change id -> _id
  ingredients: string[]; //todo change ingredientsIdList -> ingredients
  // ingredients: Ingredient[] | null; //todo change ingredientsIdList -> ingredients
  owner: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number | null;
  totalPrice?: number;
  __v: number;
};

export type responseSubmitOrder = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type responseGetOrderByNumber = {
  success: boolean;
  orders: Order[];
};

export type OrderProps = {
  order: Order;
  hasStatus: boolean;
};
