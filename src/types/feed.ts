export type FeedOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type Feed = {
  wsConnectionStatus: string;
  success: boolean;
  orders: FeedOrder[];
  total: number;
  totalToday: number;
  errorMessage?: string;
};
