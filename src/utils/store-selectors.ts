import { RootState } from 'types';

export const getIngredients = (state: RootState) => state.ingredients;
export const getBurger = (state: RootState) => state.burger;
export const getOrder = (state: RootState) => state.order;
export const getModal = (state: RootState) => state.modal;
export const getProfile = (state: RootState) => state.profile;
export const getFeed = (state: RootState) => state.feed;
