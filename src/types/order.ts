export type Order = {
  _id: string; //todo change id -> _id
  ingredients: string[] | null; //todo change ingredientsIdList -> ingredients
  owner: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  __v: number;
};
