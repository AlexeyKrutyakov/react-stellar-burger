import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingridients-card.module.css';
import PropTypes from 'prop-types';

function IngridientsCard({ name, price, image }) {
  return (
    <li className={styles.ingridients__card}>
      <span className={`${styles.counter} text text_type_digits-default`}>1</span>
      <img className={`${styles.illustration}`} src={image} alt={name} />
      <h4 className={`${styles.ingridients__price} mt-1 mb-1 text text_type_digits-default`}>
        <span>{price}</span>
        <CurrencyIcon type='primary'/>
      </h4>
      <h5 className={`${styles.card__title} text text_type_main-default `}>{name}</h5>
    </li>
  );
}

IngridientsCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}

export default IngridientsCard;
