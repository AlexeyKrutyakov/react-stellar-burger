import styles from './home-page.module.css';
// imports from modules
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
// import components
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
// import services
// import utils
import { getIngredients } from '../../utils/store-selectors';
import { AppDispatch } from 'types';

export default function HomePage() {
  const ingredientsLoadingStatus = useSelector(getIngredients).status;

  useEffect(() => {
    document.title = 'Stellar Burgers: Home';
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={`${styles.content}`}>
        {ingredientsLoadingStatus === 'loaded' && <BurgerIngredients />}
        {ingredientsLoadingStatus === 'loaded' && <BurgerConstructor />}
      </section>
    </DndProvider>
  );
}
