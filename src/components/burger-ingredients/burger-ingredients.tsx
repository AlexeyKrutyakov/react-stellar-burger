import styles from './burger-ingredients.module.css';
// imports from modules
import PropTypes from 'prop-types';
import React, { RefObject } from 'react';
import { useState, useRef } from 'react';
// import components
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGallery from '../ingredients-gallery/ingredients-gallery';
// import utils
import scroll from '../../utils/scroll';
import { STYLES } from '../../utils/constants';

function BurgerIngredients() {
  const [current, setCurrent] = useState('buns');

  const ingredients = useRef<HTMLDivElement>(null);
  const bunsGallery = useRef<HTMLHeadingElement>(null);
  const saucesGallery = useRef<HTMLHeadingElement>(null);
  const mainsGallery = useRef<HTMLHeadingElement>(null);
  const delta = 150;

  let elem = document.querySelector('h1');
  let rect = elem?.getBoundingClientRect();

  function setCategory(value: string) {
    setCurrent(value);
    scroll(value);
  }

  function handleIngredientsScroll() {
    const ingredientsBorder =
      ingredients.current !== null
        ? ingredients.current.getBoundingClientRect().top
        : 0;
    const topBunsBorder =
      bunsGallery.current !== null
        ? bunsGallery.current.getBoundingClientRect().top
        : 0;
    const topSaucesBorder =
      saucesGallery.current !== null
        ? saucesGallery.current.getBoundingClientRect().top
        : 0;
    const topMainsBorder =
      mainsGallery.current !== null
        ? mainsGallery.current.getBoundingClientRect().top
        : 0;

    function approximation(border: number) {
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
        <IngredientsGallery type="bun" />
        <h3
          className={`${STYLES.text.medium} mt-10`}
          id="sauces"
          ref={saucesGallery}
        >
          Соусы
        </h3>
        <IngredientsGallery type="sauce" />
        <h3
          className={`${STYLES.text.medium} mt-10`}
          id="mains"
          ref={mainsGallery}
        >
          Начинки
        </h3>
        <IngredientsGallery type="main" />
      </div>
    </section>
  );
}

export default BurgerIngredients;
