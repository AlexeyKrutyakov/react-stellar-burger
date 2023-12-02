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
  constructorId?: string;
};

export type StoreIngredients = {
  loaded: Ingredient[] | null;
  status: string;
  loadingHasError: boolean;
  errorMessage?: string;
};

export type ResponseIngredients = {
  success: string;
  data: Ingredient[];
};

export type IngredientIconType = {
  ingredient: Ingredient;
  options?: {
    style: {
      preview_wrap: {
        zIndex: number;
        left: string;
      };
    };
    index: number;
    length: number;
    last: number;
  };
};
