import styles from './burger-ingridients.module.css';
import Tabs from '../tabs/tabs.jsx';
import IngridientsGallery from '../ingridients-gallery/ingridients-gallery';

function BurgerIngridients() {
  return(
    <section className={`${styles.burger__tools}`}>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <Tabs />
      <div className={`${styles.ingridients} custom-scroll`}>
        <h3 className="text text_type_main-medium mt-10">Булки</h3>
        <IngridientsGallery type='bun' />
        <h3 className="text text_type_main-medium mt-10">Соусы</h3>
        <IngridientsGallery type='sauce' />
        <h3 className="text text_type_main-medium mt-10">Начинки</h3>
        <IngridientsGallery type='main' />
      </div>
    </section>
  );
}

export default BurgerIngridients;
