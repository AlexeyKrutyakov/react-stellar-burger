import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients-card.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

function IngredientsCard({ ingredient, onModalOpen }) {
  return (
    <li className={styles.ingredients__card} onClick={() => onModalOpen({type: 'ingredient__details', item: ingredient})} >
      {/* <li className={styles.ingredients__card} onClick={() => onModalOpen(ingredient)} > */}
      <span className={`${styles.counter} text text_type_digits-default`}>1</span>
      <img className={`${styles.illustration}`} src={ingredient.image} alt={ingredient.name} />
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
