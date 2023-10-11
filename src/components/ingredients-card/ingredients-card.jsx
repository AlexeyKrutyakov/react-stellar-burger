import styles from './ingredients-card.module.css';
// imports from modules
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
// import components
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
// imort constants
import { INGREDIENTS } from '../../utils/constants';
// import utils
import { ingredientPropType } from '../../utils/prop-types';
import countIngredients from '../../utils/count-ingredients';


function IngredientsCard({ ingredient, onModalOpen }) {
  const location = useLocation();
  const burgerConstructorData = useSelector(state => state.burger);

  const bun = burgerConstructorData.bun;  
  const mains = burgerConstructorData.mains;
  
  let ingredientsQuantity = 0;
  let constructorIngredientsList = [];

  switch (ingredient.type) {
    case INGREDIENTS.type.bun:
      if (bun) {
        constructorIngredientsList = [ bun ];
      }
      break;
    case INGREDIENTS.type.main:
      if (mains.length > 0)
      constructorIngredientsList = mains;
    break;
    case INGREDIENTS.type.sauce:
      constructorIngredientsList = mains;
      break;
    default:
      break;
  }

  if (constructorIngredientsList.length > 0) {
    ingredientsQuantity = countIngredients(constructorIngredientsList, ingredient._id);
  }

  const [, drag] = useDrag(() => ({
    type: 'ingredient',
    item: ingredient,
  }));

  const ingredientId = ingredient._id;

  return (
    <li className={styles.ingredients__card} onClick={() => onModalOpen({type: 'ingredient__details', item: ingredient})}>
      <Link
        className={styles.link}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
      >
      {ingredientsQuantity > 0 && ingredientsQuantity < 10 && <Counter count={ingredientsQuantity} size="default" />}
      {ingredientsQuantity > 0 && ingredientsQuantity >= 10 && <Counter count={ingredientsQuantity} size="small" />}
        <img className={`${styles.illustration}`} src={ingredient.image} alt={ingredient.name} ref={drag} />
        <h4 className={`${styles.ingredients__price} mt-1 mb-1 text text_type_digits-default`}>
          <span>{ingredient.price}</span>
          <CurrencyIcon type='primary'/>
        </h4>
        <h5 className={`${styles.card__title} text text_type_main-default `}>{ingredient.name}</h5>
      </Link>
    </li>
  );
}

IngredientsCard.propTypes = {
  ingredient: ingredientPropType,
  onModalOpen: PropTypes.func.isRequired
}

export default IngredientsCard;
