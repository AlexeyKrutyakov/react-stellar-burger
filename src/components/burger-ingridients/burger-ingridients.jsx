import styles from './burger-ingridients.module.css';
import Tabs from '../tabs/tabs.jsx';
import IngridientsGallery from '../ingridients-gallery/ingridients-gallery';

function BurgerIngridients() {
  return(
    <section className={`${styles.burger__tools}`}>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <Tabs />
      <div className={`${styles.ingridients} custom-scroll`}>
        <h2 className="text text_type_main-medium mt-10">Булки</h2>
        <IngridientsGallery type='bun' />
        <h2 className="text text_type_main-medium mt-10">Соусы</h2>
        <IngridientsGallery type='sauce' />
        <h2 className="text text_type_main-medium mt-10">Начинки</h2>
        <IngridientsGallery type='main' />
      </div>
    </section>
  );
}

export default BurgerIngridients;
