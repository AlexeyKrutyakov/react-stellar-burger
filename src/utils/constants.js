export const BURGER_API_URL = 'https://norma.nomoreparties.space/api/';

export const MODAL = {
  type: {
    orderStatus: 'order__status',
    orderDetails: 'order_details',
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
    index: '/profile',
    orderHistory: 'order-history',
  },
  login: '/login',
  register: '/register',
  resetPassword: '/reset-password',
  forgotPassword: '/forgot-password',
  ingredient: '/ingredients/:ingredientId',
  orderFeed: '/order-feed',
  orderStatus: 'order-status',
  order: '/orders/:orderNumber',
};

export const COLORS = {
  mainBlue: 'rgba(76, 76, 255)',
  transparent: 'transparent',
  transparents: {
    mainViolet: 'rgba(153, 0, 153, 0.1)',
  },
};

export const STYLES = {
  text: {
    default: 'text text_type_main-default',
    large: 'text text_type_main-large',
    medium: 'text text_type_main-medium',
    small: 'text text_type_main-small',
    defaultInactive: 'text text_type_main-default text_color_inactive',
    largeInactive: 'text text_type_main-large text_color_inactive',
    mediumInactive: 'text text_type_main-medium text_color_inactive',
    smallInactive: 'text text_type_main-small text_color_inactive',
  },
  digits: {
    default: 'text text_type_digits-default',
    large: 'text text_type_digits-large',
    medium: 'text text_type_digits-medium',
    defaultInactive: 'text text_type_digits-default text_color_inactive',
    largeInactive: 'text text_type_digits-large text_color_inactive',
    mediumInactive: 'text text_type_digits-medium text_color_inactive',
  },
};
