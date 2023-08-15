import styles from './ingredients-gallery.module.css';
import IngredientsCard from '../ingredients-card/ingredients-card';
import PropTypes from 'prop-types';
import { ingredientsPropType } from '../../utils/prop-types';

function IngredientsGallery({ type, data, onModalOpen }) {
  const ingredients = data.filter(ingredient => ingredient.type === type);
  return (
    <ul className={`${styles.ingredients__gallery} mt-6 mr-3 mb-10 ml-3`}>
      {ingredients.map(item =>
        (<IngredientsCard
          key={item._id}
          ingredient={item}
          onModalOpen={onModalOpen}
        />)
      )}
    </ul>
  );
}

IngredientsGallery.propTypes = {
  type: PropTypes.string.isRequired,
  data: ingredientsPropType,
  onModalOpen: PropTypes.func.isRequired
}

export default IngredientsGallery;
