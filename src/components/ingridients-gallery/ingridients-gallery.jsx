import styles from './ingridients-gallery.module.css';
import IngridientsCard from '../ingridients-card/ingridients-card';
import PropTypes from 'prop-types';

import { data } from '../../utils/data';

function IngridientsGallery(props) {
  const ingridients = data.filter(ingridient => ingridient.type === props.type);
  return (
    <ul className={`${styles.ingridients__gallery} mt-6 mr-3 mb-10 ml-3`}>
      {ingridients.map(item => (<IngridientsCard key={item._id} name={item.name} image={item.image} price={item.price} />))}
    </ul>
  );
}

IngridientsGallery.propTypes = {
  type: PropTypes.string,
  _id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
}

export default IngridientsGallery;
