import styles from './burger-ingredients.module.css';
// imports from modules
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
// import components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGallery from '../ingredients-gallery/ingredients-gallery';
// import utils
import scroll from '../../utils/scroll';
import { STYLES } from '../../utils/constants';

function BurgerIngredients({ onModalOpen }) {
  const [current, setCurrent] = useState('buns');

  const ingredients = useRef(null);
  const bunsGallery = useRef(null);
  const saucesGallery = useRef(null);
  const mainsGallery = useRef(null);
  const delta = 150;

  function getTopBorder(element) {
    return element.current.getBoundingClientRect().top;
  }

  function setCategory(value) {
    setCurrent(value);
    scroll(value);
  }

  // TODO: try to use @researchgate/react-intersection-observer
  function handleIngredientsScroll() {
    const ingredientsBorder = getTopBorder(ingredients);
    const topBunsBorder = getTopBorder(bunsGallery);
    const topSaucesBorder = getTopBorder(saucesGallery);
    const topMainsBorder = getTopBorder(mainsGallery);

    function approximation(border) {
      return border - ingredientsBorder;
    }

    if (
      approximation(topBunsBorder) <= delta &&
      approximation(topBunsBorder) > -delta
    ) {
      setCurrent('buns');
    } else if (
      approximation(topSaucesBorder) <= delta &&
      approximation(topSaucesBorder) > -delta
    ) {
      setCurrent('sauces');
    } else if (
      approximation(topMainsBorder) <= delta &&
      approximation(topMainsBorder) > -delta
    ) {
      setCurrent('mains');
    }
  }

  return (
    <section className={`${styles.burger__tools}`}>
      <h1 className={`${STYLES.text.large} mt-10`}>Соберите бургер</h1>
      <nav className={`${styles.tabs} mt-5`} style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setCategory}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCategory}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCategory}>
          Начинки
        </Tab>
      </nav>
      <div
        className={`${styles.ingredients} custom-scroll`}
        onScroll={handleIngredientsScroll}
        ref={ingredients}
      >
        <h3
          className={`${STYLES.text.medium} mt-10`}
          id="buns"
          ref={bunsGallery}
        >
          Булки
        </h3>
        <IngredientsGallery type="bun" onModalOpen={onModalOpen} />
        <h3
          className={`${STYLES.text.medium} mt-10`}
          id="sauces"
          ref={saucesGallery}
        >
          Соусы
        </h3>
        <IngredientsGallery type="sauce" onModalOpen={onModalOpen} />
        <h3
          className={`${STYLES.text.medium} mt-10`}
          id="mains"
          ref={mainsGallery}
        >
          Начинки
        </h3>
        <IngredientsGallery type="main" onModalOpen={onModalOpen} />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
};

export default BurgerIngredients;
