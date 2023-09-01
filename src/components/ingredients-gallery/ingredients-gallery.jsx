import styles from './ingredients-gallery.module.css';
import { useContext } from 'react';
import IngredientsCard from '../ingredients-card/ingredients-card';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../services/ingredientsContext';

function IngredientsGallery({ type, onModalOpen }) {
  const ingredients = useContext(IngredientsContext).ingredients.filter(ingredient => ingredient.type === type);
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
  onModalOpen: PropTypes.func.isRequired
}

export default IngredientsGallery;
