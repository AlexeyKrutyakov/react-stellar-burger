import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingridients-card.module.css';
import PropTypes from 'prop-types';

function IngridientsCard(props) {
  return (
    <li className={styles.ingridients__card}>
      <span className={`${styles.counter} text text_type_digits-default`}>1</span>
      <img className={`${styles.illustration}`} src={props.image} alt={props.name} />
      <h4 className={`${styles.ingridients__price} mt-1 mb-1 text text_type_digits-default`}>
        <span>{props.price}</span>
        <CurrencyIcon type='primary'/>
      </h4>
      <h5 className={`${styles.card__title} text text_type_main-default `}>{props.name}</h5>
    </li>
  );
}

IngridientsCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
}

export default IngridientsCard;
