export const BURGER_API_URL = 'https://norma.nomoreparties.space/api/';

export const MODAL = {
  type: {
    order: 'order',
    ingredientsDetails: 'ingredient__details',
    loadingSpinner: 'spinner',
  },
};

export const INGREDIENTS = {
  type: {
    bun: 'bun',
    main: 'main',
    sauce: 'sauce',
  },
};

export const TOKENS = {
  names: {
    access: 'accessToken',
    refresh: 'refreshToken',
  },
  resetTokenSent: 'resetTokenSent',
};

export const PATHS = {
  home: '/',
  profile: {
    index: 'profile',
    ordersHistory: 'orders-history',
  },
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  forgotPassword: '/forgot-password',
  ingredient: '/ingredients/:ingredientId',
  orders: '/orders',
  orderDetails: 'order-details',
};

export const COLORS = {
  mainBlue: 'rgba(76, 76, 255)',
  transparent: 'transparent',
  transparents: {
    mainViolet: 'rgba(153, 0, 153, 0.1)',
  },
};
