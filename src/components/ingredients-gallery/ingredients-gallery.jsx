import styles from './ingredients-gallery.module.css';
// imports from modules
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// import components
import IngredientsCard from '../ingredients-card/ingredients-card';
// import utils
import { getIngredients } from '../../utils/store-selectors';

function IngredientsGallery({ type }) {
  const handleOpenModal = type => {
    dispatch(openModal(type));
  };
  const ingredients = useSelector(getIngredients).loaded;
  const filteredIngredients = ingredients.filter(
    ingredient => ingredient.type === type,
  );
  return (
    <ul className={`${styles.ingredients__gallery} mt-6 mr-3 mb-10 ml-3`}>
      {filteredIngredients.map((item, index) => (
        <IngredientsCard
          key={index}
          ingredient={item}
          onModalOpen={handleOpenModal}
        />
      ))}
    </ul>
  );
}

IngredientsGallery.propTypes = {
  type: PropTypes.string.isRequired,
};

export default IngredientsGallery;
