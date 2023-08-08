import styles from './ingridients-gallery.module.css';
import IngridientsCard from '../ingridients-card/ingridients-card';
import PropTypes from 'prop-types';

import { data } from '../../utils/data';

function IngridientsGallery({ type }) {
  const ingridients = data.filter(ingridient => ingridient.type === type);
  return (
    <ul className={`${styles.ingridients__gallery} mt-6 mr-3 mb-10 ml-3`}>
      {ingridients.map(item => (<IngridientsCard key={item._id} name={item.name} price={item.price} image={item.image} />))}
    </ul>
  );
}

IngridientsGallery.propTypes = {
  type: PropTypes.string.isRequired,
}

export default IngridientsGallery;
