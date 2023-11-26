export type IngredientType = 'bun' | 'main' | 'sauce';

export type Ingredient = {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type Ingredients = {
  loaded: Ingredient[];
  status: string;
  loadingHasError: boolean;
  errorMessage: string;
};
