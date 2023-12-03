import { Ingredient } from './ingredients';

export type Order = {
  _id: string;
  ingredients: string[];
  owner: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number | null;
  totalPrice?: number;
  __v: number;
};

export type PreparedOrder = Omit<Order, 'ingredients'> & {
  ingredients: Ingredient[];
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
  order: PreparedOrder;
  hasStatus: boolean;
};
