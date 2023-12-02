import styles from './ingredients-card.module.css';
// imports from modules
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
// import components
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
// imort constants
import { INGREDIENTS, STYLES } from '../../utils/constants';
// import utils
import { ingredientPropType } from '../../utils/prop-types';
import countIngredients from '../../utils/count-ingredients';
import { getBurger } from '../../utils/store-selectors';
import { AppDispatch, Ingredient } from 'types';
import { openModal } from 'services/modalSlice';

export const IngredientsCard = ({ ingredient }: { ingredient: Ingredient }) => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const burgerConstructorData = useSelector(getBurger);
  const bun = burgerConstructorData.bun;
  const mains = burgerConstructorData.mains;

  let ingredientsQuantity = 0;
  let constructorIngredientsList: Ingredient[] | [] = [];

  const handleOpenModal = (type: string) => {
    dispatch(openModal(type));
  };

  switch (ingredient.type) {
    case INGREDIENTS.type.bun:
      if (bun) {
        constructorIngredientsList = [bun];
      }
      break;
    case INGREDIENTS.type.main:
      if (mains.length > 0) constructorIngredientsList = mains;
      break;
    case INGREDIENTS.type.sauce:
      constructorIngredientsList = mains;
      break;
    default:
      break;
  }

  if (constructorIngredientsList.length > 0) {
    ingredientsQuantity = countIngredients(
      constructorIngredientsList,
      ingredient._id,
    );
  }

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
  }));

  const ingredientId = ingredient._id;

  return (
    <li
      className={styles.ingredients__card}
      onClick={() => handleOpenModal('ingredient__details')}
    >
      <Link
        className={styles.link}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
      >
        {ingredientsQuantity > 0 && ingredientsQuantity < 10 && (
          <Counter count={ingredientsQuantity} size="default" />
        )}
        {ingredientsQuantity > 0 && ingredientsQuantity >= 10 && (
          <Counter count={ingredientsQuantity} size="small" />
        )}
        <img
          className={`${styles.illustration}`}
          src={ingredient.image}
          alt={ingredient.name}
          ref={drag}
        />
        <h4
          className={`${styles.ingredients__price} ${STYLES.digits.default} mt-1 mb-1`}
        >
          <span>{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </h4>
        <h5 className={`${styles.card__title} ${STYLES.text.default}`}>
          {ingredient.name}
        </h5>
      </Link>
    </li>
  );
};
