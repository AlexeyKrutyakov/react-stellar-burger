import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs.jsx';
import IngredientsGallery from '../ingredients-gallery/ingredients-gallery';
import PropTypes from 'prop-types';

function BurgerIngredients({ onModalOpen }) {
  return(
    <section className={`${styles.burger__tools}`}>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <Tabs />
      <div className={`${styles.ingredients} custom-scroll`}>
        <h3 className="text text_type_main-medium mt-10" id='buns'>Булки</h3>
        <IngredientsGallery type='bun' onModalOpen={onModalOpen} />
        <h3 className="text text_type_main-medium mt-10" id='sauces'>Соусы</h3>
        <IngredientsGallery type='sauce' onModalOpen={onModalOpen} />
        <h3 className="text text_type_main-medium mt-10" id='mains'>Начинки</h3>
        <IngredientsGallery type='main' onModalOpen={onModalOpen} />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onModalOpen: PropTypes.func.isRequired
}

export default BurgerIngredients;
