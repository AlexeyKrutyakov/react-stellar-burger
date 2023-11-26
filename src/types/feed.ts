type FeedOrder = {
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
  succes: boolean;
  orders: FeedOrder[];
  errorMessage: string;
  total: number;
  totalToday: number;
};
