import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients-card.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import countIngredients from '../../utils/count-ingredients';
import { INGREDIENTS } from '../../utils/constants';

function IngredientsCard({ ingredient, onModalOpen }) {
  const constructorBun = useSelector(state => state.burger.bun);
  const constructorMains = useSelector(state => state.burger.mains);
  
  let ingredientsQuantity = 0;
  let constructorIngredientsList = [];

  switch (ingredient.type) {
    case INGREDIENTS.type.bun:
      if (constructorBun) {
        constructorIngredientsList = [ constructorBun ];
      }
      break;
    case INGREDIENTS.type.main:
      if (constructorMains.length > 0)
      constructorIngredientsList = constructorMains;
    break;
    case INGREDIENTS.type.sauce:
      constructorIngredientsList = constructorMains;
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

  return (
    <li className={styles.ingredients__card} onClick={() => onModalOpen({type: 'ingredient__details', item: ingredient})}>
      {ingredientsQuantity > 0 && ingredientsQuantity < 10 && <Counter count={ingredientsQuantity} size="default" />}
      {ingredientsQuantity > 0 && ingredientsQuantity >= 10 && <Counter count={ingredientsQuantity} size="small" />}
      <img className={`${styles.illustration}`} src={ingredient.image} alt={ingredient.name} ref={drag} />
      <h4 className={`${styles.ingredients__price} mt-1 mb-1 text text_type_digits-default`}>
        <span>{ingredient.price}</span>
        <CurrencyIcon type='primary'/>
      </h4>
      <h5 className={`${styles.card__title} text text_type_main-default `}>{ingredient.name}</h5>
    </li>
  );
}

IngredientsCard.propTypes = {
  ingredient: ingredientPropType,
  onModalOpen: PropTypes.func.isRequired
}

export default IngredientsCard;
