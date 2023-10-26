import PropTypes from 'prop-types';

export const ingredientPropType = PropTypes.shape({
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired;

export const ingredientsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
).isRequired;

export const orderPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
}).isRequired;

export const preparedOrderPropType = PropTypes.shape({
  date: PropTypes.string.isRequired,
  ingredients: ingredientsPropType,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
}).isRequired;
