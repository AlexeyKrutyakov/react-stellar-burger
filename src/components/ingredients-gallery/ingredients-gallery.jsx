import styles from './ingredients-gallery.module.css';
import IngredientsCard from '../ingredients-card/ingredients-card';

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

export default IngredientsGallery;
